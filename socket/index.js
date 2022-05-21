const { Server } = require('socket.io')
const express = require('express')
const http = require('http')

const cors = require('cors')
const { GameManager } = require('./utils/GameManager')
const { isValidString } = require('./utils/validate')

const port = process.env.PORT || 7001
const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: `http://worldtrivia.herokuapp.com`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
const games = new GameManager()

io.on('connection', (socket) => {
  console.log(`${socket.id} connected!`)

  socket.on('createGame', (game) => {
    console.log(`${game.gameId} created,`)
    game.hostId = socket.id
    games.addGame(game)

    const host = {
      role: 'host',
      ...game.host,
      roomId: game.gameId,
      socketId: socket.id,
      score: 0,
    }
    games.addPlayer(host)
    socket.join(game.gameId)

    io.to(game.gameId).emit('update-players', [host])
  })

  socket.on('joinGame', (config) => {
    const player = {
      ...config.user,
      socketId: socket.id,
      score: 0,
      role: 'player',
    }
    games.addPlayer(player)
    let players = games.getPlayersByRoom(config.room)
    socket.join(config.room)
    console.log(games.players)
    io.to(config.room).emit('update-players', players)

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
  })

  // Game start by Host

  socket.on('startGame', (gameId, callback) => {
    console.log(`game started , game id: ${gameId}`)
    // let roomId = games.getGameByHost(socket.id).gameId;
    if (gameId) {
      let players = games.getPlayersByRoom(gameId)
      console.log(`players: ${players[0].name}, ${players}`)

      if (players.length > 0) {
        let questionData = games.getCurrentQuestion(gameId)
        games.getGameByHost(socket.id).active = true
        console.log('first question: ' + questionData.question)
        games.setWaiting(gameId)
        let waiting = games.getWaiting(gameId)
        io.to(gameId).emit('gameStarted', gameId)
        console.log('waiting: ' + waiting)
        io.to(gameId).emit('newQuestion', questionData)

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
  })

  socket.on('getNextQuestion', (roomId) => {
    let remaining = games.availableQuestions(roomId)
    console.log('remaining questions: ', remaining)

    if (remaining === 0) {
      const players = games.getPlayersByRoom(roomId)
      const response = []
      players.forEach((player) => {
        response.push(player)
      })
      //  io.to(player.roomId).emit("msg");
      io.to(roomId).emit('gameFinished', response)
      console.log(`${roomId} finished!`)
    } else {
      games.nextQuestion(roomId)
      let questionData = games.getCurrentQuestion(roomId)
      console.log('next question', questionData.question)

      //  var res = setupQuestion(player.room);
      games.setWaiting(roomId)
      io.to(roomId).emit('newQuestion', questionData)
    }
  })

  socket.on('submitAnswer', (answer, callback) => {
    const player = games.getPlayerBySocket(socket.id)
    console.log('player:', player.name)
    if (player) {
      const { question } = games.getCurrentQuestion(player.roomId)
      const correctAnswer = question.answers.find((answer) => answer.isCorrect)
      let isCorrect = correctAnswer.text === answer ? true : false
      if (isCorrect) {
        games.updateScore(player.socketId, 1)
      }
      //    callback({ code: "correct", score: p.score });
      //    var g = games.getGameByRoom(p.room);
      io.to(socket.id).emit('answerResult', {
        player,
        question,
        isCorrect,
      })
      io.to(player.roomId).emit('otherAnswersResult', {
        player,
        question,
        isCorrect,
      })

      //    callback({
      //      code: "incorrect",
      //      score: player.score,
      //      correct: decodeURIComponent(question.correct_answer),
      //    });
      //    var g = games.getGameByRoom(player.room);
      //    io.to(g.host).emit("incorrectAnswer", player.username);
      let waiting = games.getWaiting(player.roomId)
      console.log('waiting before update after answer:', waiting)
      games.updateWaiting(player.roomId)

      waiting = games.getWaiting(player.roomId)
      console.log('waiting after update aftereach answer:', waiting)

      if (waiting === 0) {
        let remaining = games.availableQuestions(player.roomId)
        console.log('remaining questions: ', remaining)

        if (remaining === 0) {
          const players = games.getPlayersByRoom(player.roomId)
          const response = []
          players.forEach((player) => {
            response.push(player)
          })
          // io.to(player.room).emit("msg");

          io.to(player.roomId).emit('gameFinished', response)
          console.log(`${player.roomId} finished!`)
          const removedPlayers = games.removePlayersByRoom(player.roomId)
          console.log(`Removed players: ${removedPlayers}`)
          console.log(`Players: ${games.players}`)
          game = games.removeGameByRoom(player.roomId)
        } else {
          games.nextQuestion(player.roomId)
          const questionData = games.getCurrentQuestion(player.roomId)

          games.setWaiting(player.roomId)
          io.to(player.roomId).emit('newQuestion', questionData)
        }
      } else {
        console.log('Players that not answerd :', waiting)
      }
    } else {
      console.log('player is not available')
    }
  })

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected')
    let roomId = games.getPlayerBySocket(socket.id)?.roomId
    if (roomId) {
      let type = games.checkHostOrPlayer(socket.id)
      console.log('GameId:', roomId)
      console.log('Type:', type)

      let game, player
      if (type === 'HOST') {
        game = games.removeGame(socket.id)
        // players = games.removeFromRoom(game.room);
        // players.forEach((player) => {
        //   io.emit("HOST-DISCONNECT");
        // });
      } else if (type === 'PLAYER') {
        player = games.removePlayer(socket.id)
        let players = games.getPlayersByRoom(roomId)
        io.to(roomId).emit('update-players', players)
        // game = games.getGameByRoom(player.room);
      }
    }

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
  })
})

function setupQuestion(roomName) {
  var fullQuestion = games.getCurrentQuestion(roomName)
  var options = fullQuestion.incorrect_answers.concat(fullQuestion.correct_answer)
  var shuffledOptions = shuffleArray(options)
  var question = {
    category: decodeURIComponent(fullQuestion.category),
    type: fullQuestion.type,
    question: decodeURIComponent(fullQuestion.question),
    options: shuffledOptions,
  }

  return question
}

// app.use(express.static(publicPath));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(publicPath, "index.html"));
// });

server.listen(port, () => {
  console.log('Socket Server Running!', port)
})
