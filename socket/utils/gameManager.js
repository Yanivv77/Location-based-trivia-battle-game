

const { getQuestions } = require("./questionService");

class GameManager {
  constructor() {
    this.quizzes = {};
    this.players = [];
    this.waitingPlayers = [];
    this.games = [];

  }

  addGame(game) {
    this.games.push(game)

    const quiz = {
      qs: game.questions,
      currentQuestionNumber: game.currentQuestionNumber,
      waiting: 0,
    }

    this.quizzes[game.gameId] = quiz
    console.log(this.quizzes[game.gameId])

    return game
  }
  removeGame(hostId) {
    this.games = this.games.filter((game) => game.hostId !== hostId)
  }
  removeGameByRoom(roomId) {
    this.games = this.games.filter((game) => game.gameId !== roomId)
  }

  addPlayer(player) {

    if (Array.isArray(player) && player.length) {
      console.log("Adding waiting player", player);
      this.players = [...this.players, ...player];
      this.waitingPlayers = this.waitingPlayers.filter(
        (p) => p.roomId !== player[0].roomId
      );
    } else {
      this.players.push(player);
    }

  }

  removePlayer(socketId) {
    const player = this.getPlayerBySocket(socketId)
    if (player) {
      this.players = this.players.filter((player) => player.socketId !== socketId)
      console.log(this.players)
      return player
    } else {
      return null
    }
  }
  addWaitingPlayer(player) {
    this.waitingPlayers.push(player);
    console.log(this.waitingPlayers[0]);
  }

  getWaitingPlayersByGame(gameId) {
    const waitingPlayers = this.waitingPlayers.filter(
      (p) => p.roomId === gameId
    );
    return waitingPlayers;
  }

  removePlayersByRoom(roomId) {
    this.players = this.players.filter((player) => player.roomId !== roomId)
  }

  getPlayersByRoom(roomID) {
    return this.players.filter((player) => player.roomId === roomID)
  }
  getGameByHost(hostId) {
    return this.games.find((game) => game.hostId === hostId)
  }

  getGameByRoom(roomId) {
    let game = this.games.find((game) => game.gameId === roomId)
    return game
  }

  getPlayerBySocket(socketId) {
    let player = this.players.find((p) => p.socketId === socketId)
    return player
  }

  checkHostOrPlayer(socketId) {
    const hostCandidate = this.players.find((player) => player.socketId === socketId)
    let type = hostCandidate.role === 'host' ? 'HOST' : 'PLAYER'

    return type
  }

  checkIsAvailable(roomId) {
    let isNotAvailable = this.games.find((game) => game.gameId === roomId)
    return isNotAvailable ? false : true
  }

  getCurrentQuestion(room) {
    let currentNumber = this.quizzes[room].currentQuestionNumber
    return {
      question: this.quizzes[room].qs[currentNumber - 1],
      number: currentNumber,
    }
  }

  nextQuestion(room) {
    this.quizzes[room].currentQuestionNumber += 1
    //console.log(this.quizzes[room].qs);
  }

  availableQuestions(room) {
    console.log('available questions:')
    console.log(this.quizzes[room].qs.length)
    console.log(this.quizzes[room].currentQuestionNumber)
    let remaining = this.quizzes[room].qs.length - this.quizzes[room].currentQuestionNumber
    return remaining
  }

  setWaiting(room) {
    let val = this.getPlayersByRoom(room).length
    this.quizzes[room].waiting = val
    //console.log("waiting", val);
  }
  setRoundStartTime(room) {
    let startedAt = (this.quizzes[room].startedAt = Date.now());
    console.log("started at", startedAt);
    return startedAt;
  }
  getRoundTime(room) {
    let startedAt = this.quizzes[room].startedAt;
    let pastTillNow = Date.now() - startedAt;
    const currentSeconds = Math.floor(pastTillNow / 1000);
    return currentSeconds;
  }

  updateWaiting(room) {
    if (this.quizzes[room].waiting > 0) {
      this.quizzes[room].waiting -= 1
    }
    //console.log("updated waiting!");
  }

  getWaiting(room) {
    return this.quizzes[room].waiting
  }

  updateScore(socketID, points) {
    let player = this.getPlayerBySocket(socketID)
    if (player) {
      //  var i = this.players.findIndex((p) => {
      //    return p.id === socketID;
      //  });
      //  this.players[i].score += points;
      player.score += points
    }
    //console.log("Updated Score!");
    return player
  }
}

module.exports = GameManager
