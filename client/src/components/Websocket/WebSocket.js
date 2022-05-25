import React, { createContext, useEffect, useRef } from "react";
import io from "socket.io-client";
// import { WS_BASE } from './config';
import { useDispatch, useSelector } from "react-redux";

import {
  addPlayer,
  updatePlayers,
  removePlayer,
  setQuestion,
  setAnswer,
  setAllAnswers,
} from "../../features/quiz/quizSlice";
import {
  finishGame,
  createGamePlayer,
  setGameToActive,
  setGameOptions,
  setWait,
  setTimer,
} from "../../features/game/gameSlice";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const players = useSelector((state) => state.quiz.quizPlayers);
  const socket = useRef();
  //   if (!socket.current) {
  //     socket.current = io("http://localhost:7000");
  //     console.log(socket.current);
  //   }

  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.game);

  const createGame = (game) => {
    socket.current.emit("createGame", game, (res) => {
      console.log(res);
    });
    //    dispatch(updateChatLog(payload));
  };
  const startGame = (gameId) => {
    socket.current.emit("startGame", gameId);
  };

  const joinGame = (config) => {
    socket.current.emit("joinGame", config, (msg) => {
      console.log(msg);
    });
    dispatch(createGamePlayer({ userName: user?.name || config.name }));
  };

  const submitAnswer = (answer) => {
    socket.current.emit("submitAnswer", answer);
  };

  const nextQuestion = () => {
    socket.current.emit("getNextQuestion", game.gameId);
  };

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("https://triviasocket.herokuapp.com");
      // socket.current = io("http://localhost:7001");
      console.log("socket:", socket);

      socket.current.on("update-players", (players) => {
        dispatch(updatePlayers(players));
      });

      socket.current.on("player-disconnected", (player) => {
        console.log(player);
        dispatch(removePlayer(player));
      });

      socket.current.on("ALL-DISCONNECT", () => {
        //  if (state.game.status !== "finished") {
        //   dispatch(resetGame());
        //   dispatch(setPlayers([]));
        //   dispatch(resetType());
        //   socket.disconnect();
        //   socket.connect();
        //    alert("All players disconnected. Taking you back to the home page.");
        //  }
      });

      socket.current.on("HOST-DISCONNECT", () => {
        //  if (state.game.status !== "finished") {
        //      dispatch(resetGame());
        //      dispatch(setPlayers([]));
        //      dispatch(resetType());
        //      disconnect();
        //      connect();
        //    alert("Host Disconnected. Taking you back to the home page.");
        //  }
      });

      if (socket.current) {
        socket.current.on("newQuestion", (question) => {
          console.log(`Question ${question.number} : ${question}`);

          if (question.number > 1) {
            setTimeout(() => {
              dispatch(setQuestion(question));
            }, 4000);
          } else {
            dispatch(setQuestion(question));
          }

          dispatch(setWait(false));
        });
      }

      socket.current.on("answerResult", (data) => {
        console.log(data);
        dispatch(setAnswer(data));
      });

      socket.current.on("otherAnswersResult", (data) => {
        console.log(data);
        dispatch(setAllAnswers(data));
      });

      socket.current.on("gameStarted", (gameOptions) => {
        console.log(gameOptions);
        dispatch(setTimer(gameOptions.secondsPerQuestion));
      });

      socket.current.on("activeGame", (game) => {
        console.log("activeGame:", game);
        if (game.waitTillNextQuestion) {
          dispatch(setWait(true));
          dispatch(setGameToActive());
          dispatch(setTimer(game.gameOptions.secondsPerQuestion));
        }
      });

      socket.current.on("gameFinished", (allPlayers) => {
        console.log(allPlayers);
        setTimeout(() => {
          dispatch(updatePlayers(allPlayers));
          dispatch(finishGame());
        }, 2500);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        joinGame,
        createGame,
        startGame,
        submitAnswer,
        nextQuestion,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
