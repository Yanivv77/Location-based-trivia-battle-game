import React, { createContext, useEffect, useRef } from "react";
import io from "socket.io-client";
// import { WS_BASE } from './config';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addPlayer,
  updatePlayers,
  removePlayer,
  setQuestion,
  setAnswer,
  setAllAnswers,
} from "../../features/quiz/quizSlice";
import { finishGame, createGamePlayer } from "../../features/game/gameSlice";

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
    socket.current.emit("joinGame", config);
    dispatch(createGamePlayer({ userName: user?.name || config.name }));
  };

  const submitAnswer = (answer) => {
    socket.current.emit("submitAnswer", answer);
  };

  const nextQuestion = () => {
    socket.current.emit("getNextQuestion", game.gameId);
  };

  useEffect(() => console.log("useEffect"), []);
  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:7000");
      console.log("socket:", socket);

      socket.current.on("update-players", (players) => {
        dispatch(updatePlayers(players));
      });

      socket.current.on("player-disconected", (player) => {
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
          console.log("new question: ", question);
          if (question.number > 1) {
            setTimeout(() => {
              dispatch(setQuestion(question));
            }, 4000);
          } else {
            dispatch(setQuestion(question));
          }
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

      socket.current.on("incorrectAnswer", (player) => {
        // dispatch(setStroke(player, "red"));
      });

      socket.current.on("gameFinished", (scoreboard) => {
        console.log(scoreboard);
        setTimeout(() => dispatch(finishGame()), 1500);
      });

      //  socket.current.on("newQuestion", (res) => {
      //       if (res.wait === true) {
      //         setTimeout(() => {
      //               store.dispatch(setMessage(""));
      //               store.dispatch(resetStroke());
      //               store.dispatch(setQuestion(res.question));
      //         }, 2000);
      //       } else {
      //           dispatch(setMessage(""));
      //           dispatch(setStatus("active"));
      //           dispatch(setQuestion(res.question));
      //       }
      //  });
    }
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
