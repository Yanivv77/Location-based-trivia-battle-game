// const { GameManager } = require("js-gamemanager");
const { getQuestions } = require("./questionService");

class GameManager {
  constructor() {
    this.quizzes = {};
    this.players = [];
    this.games = [];
  }

  addGame(hostID, roomName) {
    const game = {
      host: hostID,
      roomId: roomName,
      active: false,
    };
    this.games.push(game);

    const quiz = {
      qs: getQuestions(),
      currentQuestionNumber: 1,
      waiting: 0,
    };

    this.quizzes[roomName] = quiz;

    return game;
  }

  addPlayer(room, name, socketId) {
    this.players.push({ id: socketId, name, roomId: room, score: 0 });
    return { id: socketId, name, roomId: room, score: 0 };
  }

  removePlayer(socketId) {
    const player = this.getPlayerBySocket(socketId);
    console.log("before deleting:", player);
    console.log("players:", this.players);
    this.players = this.players.filter((player) => player.id !== socketId);
    console.log("after deleting:", player);
    console.log(this.players);
    return player;
  }
  getPlayersByRoom(roomID) {
    return this.players.filter((player) => player.roomId === roomID);
  }
  getGameByHost(hostId) {
    return this.games.find((game) => game.host === hostId);
  }

  getPlayerBySocket(socketId) {
    let player = this.players.find((p) => p.id === socketId);
    return player;
  }

  getGameByRoom(roomId) {
    let game = this.games.find((game) => game.roomId === roomId);
    return game;
  }

  checkHostOrPlayer(socketId) {
    let type = this.games.find((game) =>
      game.host === socketId ? "HOST" : "PLAYER"
    );
    return type;
  }

  checkIsAvailable(roomId) {
    let isNotAvailable = this.games.find((game) => game.roomId === roomId);
    return isNotAvailable ? false : true;
  }

  getCurrentQuestion(room) {
    let currentNumber = this.quizzes[room].currentQuestionNumber;
    return {
      question: this.quizzes[room].qs[currentNumber - 1],
      number: currentNumber,
    };
  }

  nextQuestion(room) {
    this.quizzes[room].currentQuestionNumber += 1;
    //console.log(this.quizzes[room].qs);
  }

  availableQuestions(room) {
    return (
      this.quizzes[room].qs.length - this.quizzes[room].currentQuestionNumber
    );
  }

  setWaiting(room) {
    let val = this.getPlayersByRoom(room).length;
    this.quizzes[room].waiting = val;
    //console.log("waiting", val);
  }

  updateWaiting(room) {
    if (this.quizzes[room].waiting > 0) {
      this.quizzes[room].waiting -= 1;
    }
    //console.log("updated waiting!");
  }

  getWaiting(room) {
    return this.quizzes[room].waiting;
  }

  updateScore(socketID, points) {
    let player = this.getPlayerBySocket(socketID);
    if (player) {
      //  var i = this.players.findIndex((p) => {
      //    return p.id === socketID;
      //  });
      //  this.players[i].score += points;
      player.score += points;
    }
    //console.log("Updated Score!");
    return player;
  }
}

module.exports = { GameManager };
