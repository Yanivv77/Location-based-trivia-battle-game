const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
// const path = require("path");
const cors = require("cors");
const { GameManager } = require("./utils/GameManager");
const { isValidString } = require("./utils/validate");
// const { getCategories, shuffleArray } = require("./utils/questions");

const port = process.env.PORT || 7000;
const app = express();
app.use(cors());
// const publicPath = path.join(__dirname, "..", "public");
const server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
var games = new GameManager();

io.on("connection", (socket) => {
  console.log(`${socket.id} connected!`);

  //     getCategories().then((res) => {
  //         socket.emit("categories", res.trivia_categories);
  //     }).catch((err) => {
  //         console.log(err);
  //     });

  //     socket.on("msg", () => {
  //         console.log("Called")
  //         socket.emit("new", new Date().toTimeString());
  //     });

  socket.on("createRoom", (config, callback) => {
    games.addGame(socket.id, config.room);
    let player = games.addPlayer(config.room, config.name, socket.id);
    socket.join(config.room);
    let players = games.getPlayersByRoom(config.room);
    io.to(config.room).emit("joinedGame", players);
    console.log(games);
    //     if (isValidString(config.roomId)) {
    //       if (games.checkIsAvailable(config.roomId)) {
    //         games.addGame(socket.id, config.roomId, config.questions);
    //         let player = games.addPlayer(config.room, config.name, socket.id);
    //         socket.join(config.roomId);
    //         console.log(games);
    //         io.to(config.roomId).emit("PLAYER-CONNECTED", player);
    //         callback({ code: "success" });
    //       } else {
    //         callback({
    //           code: "ROOMERROR",
    //           msg: `Room name ${config.roomId} is taken. Please try another name.`,
    //         });
    //       }
    //     } else {
    //       callback({
    //         code: "ROOMERROR",
    //         msg: `Cannot use empty string for room name.`,
    //       });
    //     }
  });

  socket.on("joinGame", (config) => {
    games.addPlayer(config.room, config.name, socket.id);
    let players = games.getPlayersByRoom(config.room);
    socket.join(config.room);
    console.log(games.players);
    io.to(config.room).emit("joinedGame", players);
    //     if (isValidString(config.name) && isValidString(config.room)) {
    //       let g = games.getGameByRoom(config.room);
    //       if (g && g.active) {
    //         return callback({
    //           code: "NAMEERROR",
    //           msg: `Cannot join room ${config.name}. Game has already started.`,
    //         });
    //       }
    //       if (!games.checkRoomName(config.room)) {
    //         if (games.checkUsername(config.room, config.name)) {
    //           let player = games.addPlayer(config.room, config.name, socket.id);
    //           socket.join(config.room);
    //           socket.emit("joinedRoom");
    //           let game = games.getGameByRoom(config.room);
    //           let players = games.getFromRoom(config.room);
    //           callback({ code: "success" });
    //           io.to(config.room).emit("PLAYER-CONNECTED", player);
    //         } else {
    //           callback({
    //             code: "NAMEERROR",
    //             msg: `${config.name} is already being used in room: ${config.room}`,
    //           });
    //         }
    //       } else {
    //         callback({
    //           code: "NAMEERROR",
    //           msg: "Room does not exist!",
    //         });
    //       }
    //     } else {
    //       callback({
    //         code: "NAMEERROR",
    //         msg: `Please enter both the room name and username.`,
    //       });
    //     }
  });

  // Game start by Host
  socket.on("startGame", (undefined, callback) => {
    let roomId = games.getGameByHost(socket.id).roomId;
    if (roomId) {
      let players = games.getPlayersByRoom(roomId);

      if (players.length > 0) {
        let questionData = games.getCurrentQuestion(roomId);
        games.getGameByHost(socket.id).active = true;
        console.log("questionData: " + questionData);
        games.setWaiting(roomId);
        io.to(roomId).emit("gameStarted", roomId);
        io.to(roomId).emit("newQuestion", questionData);
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

  socket.on("getNextQuestion", () => {
    let roomId = games.getGameByHost(socket.id).roomId;
    let remaining = games.availableQuestions(roomId);
    if (remaining === 0) {
      const players = games.getPlayersByRoom(roomId);
      const response = [];
      players.forEach((player) => {
        response.push(player);
      });
      //  io.to(player.roomId).emit("msg");
      io.to(roomId).emit("gameFinished", response);
      console.log(`${roomId} finished!`);
    } else {
      games.nextQuestion(roomId);
      let questionData = games.getCurrentQuestion(roomId);
      console.log(questionData);
      //  var res = setupQuestion(player.room);
      games.setWaiting(roomId);
      io.to(roomId).emit("newQuestion", questionData);
    }
  });

  socket.on("submitAnswer", (answer, callback) => {
    const player = games.getPlayerBySocket(socket.id);
    if (player) {
      const { question } = games.getCurrentQuestion(player.roomId);
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      console.log(correctAnswer);
      if (correctAnswer.text === answer) {
        games.updateScore(player.id, 1);
        //    callback({ code: "correct", score: p.score });
        //    var g = games.getGameByRoom(p.room);
        io.to(socket.id).emit("answerResult", {
          player,
          correctAnswer,
          isCorrect: true,
        });
        io.to(player.roomId).emit("otherAnswersResult", {
          player,
          correctAnswer,
          isCorrect: true,
        });
      } else {
        io.to(socket.id).emit("answerResult", {
          player,
          correctAnswer,
          isCorrect: false,
        });
        io.to(player.roomId).emit("otherAnswersResult", {
          player,
          correctAnswer,
          isCorrect: true,
        });
        //    callback({
        //      code: "incorrect",
        //      score: player.score,
        //      correct: decodeURIComponent(question.correct_answer),
        //    });
        //    var g = games.getGameByRoom(player.room);
        //    io.to(g.host).emit("incorrectAnswer", player.username);
      }

      games.updateWaiting(player.roomId);

      let waiting = games.getWaiting(player.roomId);

      if (waiting === 0) {
        let remaining = games.availableQuestions(player.roomId);
        if (remaining === 0) {
          const players = games.getPlayersByRoom(player.roomId);
          const response = [];
          players.forEach((player) => {
            response.push(player);
          });
          // io.to(player.room).emit("msg");
          io.to(player.roomId).emit("gameFinished", response);
          console.log(`${player.roomId} finished!`);
        } else {
          games.nextQuestion(player.roomId);
          const questionData = games.getCurrentQuestion(player.roomId);
          games.setWaiting(player.roomId);
          io.to(player.roomId).emit("newQuestion", questionData);
        }
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    let roomId = games.getPlayerBySocket(socket.id)?.roomId;
    games.removePlayer(socket.id);
    let players = games.getPlayersByRoom(roomId);
    io.to(roomId).emit("joinedGame", players);
    //     let type = games.checkHostOrPlayer(socket.id);
    //     let game, player, players;
    //     if (type === "HOST") {
    //       game = games.removeGame(socket.id);
    //       players = games.removeFromRoom(game.room);
    //       players.forEach((player) => {
    //         io.emit("HOST-DISCONNECT");
    //       });
    //     } else if (type === "PLAYER") {
    //       player = games.removePlayer(socket.id);
    //       players = games.getFromRoom(player.room);
    //       game = games.getGameByRoom(player.room);

    //       if (game.active) {
    //         if (players.length > 0) {
    //           games.setWaiting(player.room);
    //           io.to(player.room).emit("PLAYER-DISCONNECT", {
    //             name: player.username,
    //             score: player.score,
    //           });
    //         } else {
    //           game = games.getGameByRoom(player.room);
    //           games.removeGame(game.host);
    //           let hostSocket = io.sockets.connected[game.host];
    //           hostSocket.leave(game.room);
    //           io.to(game.host).emit("ALL-DISCONNECT");
    //           console.log(games.games, "    ", games.players);
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

function setupQuestion(roomName) {
  var fullQuestion = games.getCurrentQuestion(roomName);
  var options = fullQuestion.incorrect_answers.concat(
    fullQuestion.correct_answer
  );
  var shuffledOptions = shuffleArray(options);
  var question = {
    category: decodeURIComponent(fullQuestion.category),
    type: fullQuestion.type,
    question: decodeURIComponent(fullQuestion.question),
    options: shuffledOptions,
  };

  return question;
}

// app.use(express.static(publicPath));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(publicPath, "index.html"));
// });

server.listen(port, () => {
  console.log("Socket Server Running!", port);
});
