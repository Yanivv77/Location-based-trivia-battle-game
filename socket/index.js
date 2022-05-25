const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const cors = require('cors')
const GameManager = require('./utils/gameManager')
const { isValidString } = require('./utils/validate')

const port = process.env.PORT || 7001
const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['https://worldtrivia.herokuapp.com', 'https://triviasocket.herokuapp.com', 'http://localhost:3000'],

  },
});
const GameManager = new GM();


io.on("connection", (socket) => {
  console.log(`${socket.id} connected!`);
  console.log(`Total games :${GameManager.games.length} `);
  console.log(`Total players :${GameManager.players.length} `);

  socket.on("createGame", (game) => {
    console.log(`New game id: ${game.gameId} created,`);
    console.log(`Total games :${GameManager.games.length} `);
    console.log(`Total players :${GameManager.players.length} `);
    game.hostId = socket.id;
    GameManager.addGame(game);


    const host = {
      role: 'host',
      ...game.host,
      roomId: game.gameId,
      socketId: socket.id,
      score: 0,

    };
    GameManager.addPlayer(host);
    socket.join(game.gameId);

    io.to(game.gameId).emit("update-players", [host]);
  });

  socket.on("joinGame", (config, callback) => {

    const player = {
      ...config.user,
      socketId: socket.id,
      score: 0,

      role: "player",
    };

    let currentGame = GameManager.getGameByRoom(config.room);
    console.log(currentGame);
    if (currentGame && currentGame.active) {
      console.log(currentGame);
      const remainingTime = GameManager.getRoundTime(config.room);
      console.log(remainingTime);
      socket.join(config.room);
      GameManager.addWaitingPlayer(player);
      // let questionData = GameManager.getCurrentQuestion(config.room);
      io.to(socket.id).emit("activeGame", {
        gameOptions: currentGame.gameOptions,
        waitTillNextQuestion: true,
        isActive: true,
        msg: `Game with id: ${config.room} has already started.`,
      });

      callback({
        time: remainingTime,
        waitTillNextQuestion: true,
        isActive: true,
        msg: `Game with id: ${config.room} has already started.`,
      });
    } else if (currentGame) {
      GameManager.addPlayer(player);
      let players = GameManager.getPlayersByRoom(config.room);
      socket.join(config.room);
      console.log(GameManager.players);
      io.to(config.room).emit("update-players", players);
    }
  });

  // Game start by Host

  socket.on("startGame", (gameId, callback) => {
    console.log(`game started , game id: ${gameId}`);
    // let roomId = GameManager.getGameByHost(socket.id).gameId;
    if (gameId) {
      let players = GameManager.getPlayersByRoom(gameId);
      console.log(
        `player: ${players[0].name},total players: ${players.length}`
      );

      if (players.length > 0) {
        let questionData = GameManager.getCurrentQuestion(gameId);
        GameManager.getGameByHost(socket.id).active = true;
        let gameOptions = GameManager.getGameByHost(socket.id).gameOptions;
        console.log("first question: " + questionData.question);
        GameManager.setWaiting(gameId);
        let waiting = GameManager.getWaiting(gameId);
        io.to(gameId).emit("gameStarted", gameOptions);
        console.log("waiting answer: " + waiting);
        let roundStartedAt = GameManager.setRoundStartTime(gameId);
        io.to(gameId).emit("newQuestion", questionData);


        //    callback({ code: "success" });
      } else {
        //    callback({
        //      code: "STARTERROR",
        //      msg: "Not enough players to start the game.",
        //    });
      }
    } else {
      // Add error handling!
    }

  });

  socket.on("getNextQuestion", (roomId) => {
    let remaining = GameManager.availableQuestions(roomId);
    console.log("remaining questions: ", remaining);


    if (remaining === 0) {
      const players = GameManager.getPlayersByRoom(roomId);
      const response = [];
      players.forEach((player) => {

        response.push(player);
      });

      io.to(roomId).emit("gameFinished", response);
      console.log(`${roomId} finished!`);
      const removedPlayers = GameManager.removePlayersByRoom(roomId);
      console.log(`Removed players: ${removedPlayers}`);
      console.log(`Players: ${GameManager.players}`);
      game = GameManager.removeGameByRoom(roomId);
    } else {
      GameManager.nextQuestion(roomId);
      let questionData = GameManager.getCurrentQuestion(roomId);
      console.log("next question", questionData.question);

      //  var res = setupQuestion(player.room);


      let roundStartedAt = GameManager.setRoundStartTime(roomId);

      let waitingPlayers = GameManager.getWaitingPlayersByGame(roomId);
      console.log("waiting players", waitingPlayers);

      if (waitingPlayers.length > 0) {
        console.log(`Total players before :${GameManager.players.length} `);
        GameManager.addPlayer(waitingPlayers);
        const players = GameManager.getPlayersByRoom(roomId);
        console.log(
          `Total players after adding waiting:${GameManager.players.length} `
        );
        io.to(roomId).emit("update-players", players);
      }
      GameManager.setWaiting(roomId);
      io.to(roomId).emit("newQuestion", questionData);
    }
  });

  socket.on("submitAnswer", (answer, callback) => {
    const player = GameManager.getPlayerBySocket(socket.id);
    console.log("player:", player.name);
    if (player) {
      const { question } = GameManager.getCurrentQuestion(player.roomId);
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      let isCorrect = correctAnswer.text === answer ? true : false;
      if (isCorrect) {
        GameManager.updateScore(player.socketId, 1);
      }
      //    callback({ code: "correct", score: p.score });
      //    var g = GameManager.getGameByRoom(p.room);
      io.to(socket.id).emit("answerResult", {
        name: player.name,
        id: player.id,
        score: player.score,
        question,
        isCorrect,
      });
      io.to(player.roomId).emit("otherAnswersResult", {
        name: player.name,
        id: player.id,
        score: player.score,
        question,
        isCorrect,
      });

      let waiting = GameManager.getWaiting(player.roomId);
      console.log("waiting before update after answer:", waiting);
      GameManager.updateWaiting(player.roomId);

      waiting = GameManager.getWaiting(player.roomId);
      console.log("waiting after update aftereach answer:", waiting);

      if (waiting === 0) {
        let remaining = GameManager.availableQuestions(player.roomId);
        console.log("remaining questions: ", remaining);


        if (remaining === 0) {
          const players = GameManager.getPlayersByRoom(player.roomId);
          const response = [];
          players.forEach((player) => {
            response.push(player);
          });
          // io.to(player.room).emit("msg");


          io.to(player.roomId).emit("gameFinished", response);
          console.log(`${player.roomId} finished!`);
          const removedPlayers = GameManager.removePlayersByRoom(player.roomId);
          console.log(`Removed players: ${removedPlayers}`);
          console.log(`Players: ${GameManager.players}`);
          game = GameManager.removeGameByRoom(player.roomId);
        } else {
          GameManager.nextQuestion(player.roomId);
          const questionData = GameManager.getCurrentQuestion(player.roomId);
          let waitingPlayers = GameManager.getWaitingPlayersByGame(
            player.roomId
          );
          console.log("waiting players", waitingPlayers);

          if (waitingPlayers.length > 0) {
            console.log(`Total players before :${GameManager.players.length} `);
            GameManager.addPlayer(waitingPlayers);
            const players = GameManager.getPlayersByRoom(player.roomId);
            console.log(
              `Total players after adding waiting:${GameManager.players.length} `
            );
            io.to(player.roomId).emit("update-players", players);

            let roundStartedAt = GameManager.setRoundStartTime(player.roomId);
          }
          GameManager.setWaiting(player.roomId);
          io.to(player.roomId).emit("newQuestion", questionData);
        }
      } else {
        console.log("Not all players answer yet");

      }
    } else {
      console.log('player is not available')
    }

  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    let roomId = GameManager.getPlayerBySocket(socket.id)?.roomId;
    if (roomId) {
      let type = GameManager.checkHostOrPlayer(socket.id);
      console.log("GameId:", roomId);
      console.log("Type:", type);
      const players = GameManager.getPlayersByRoom(roomId);

      let game, player;

      if (players.length === 1) {
        player = GameManager.removePlayer(socket.id);
        game = GameManager.removeGameByRoom(roomId);
        console.log("Games after deleting game:", GameManager.games.length);
      } else {
        player = GameManager.removePlayer(socket.id);
        GameManager.updateWaiting(roomId);
        io.to(roomId).emit("update-players", players);
        let waiting = GameManager.getWaiting(roomId);
        console.log("waiting after deleting player: ", player.name, waiting);
      }
    }

    // game = GameManager.getGameByRoom(player.room);


    //       if (game.active) {
    //         if (players.length > 0) {
    //           GameManager.setWaiting(player.room);
    //           io.to(player.room).emit("PLAYER-DISCONNECT", {
    //             name: player.username,
    //             score: player.score,
    //           });
    //         } else {
    //           game = GameManager.getGameByRoom(player.room);
    //           GameManager.removeGame(game.host);
    //           let hostSocket = io.sockets.connected[game.host];
    //           hostSocket.leave(game.room);
    //           io.to(game.host).emit("ALL-DISCONNECT");
    //           console.log(GameManager.GameManager, "    ", GameManager.players);
    //         }
    //       } else {
    //         io.to(player.room).emit("PLAYER-DISCONNECT", {
    //           name: player.username,
    //           score: player.score,
    //         });
    //       }
    //     }
    //   });
  });
});

server.listen(port, () => {
  console.log("Socket Server Running!", port);
});
