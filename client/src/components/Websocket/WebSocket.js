import React, { createContext, useEffect, useRef } from "react";
import io from "socket.io-client";
// import { WS_BASE } from './config';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addPlayers,
  removePlayer,
  setQuestion,
  setAnswer,
  setAllAnswers,
} from "../../features/quiz/quizSlice";
import { finishGame } from "../../features/game/gameSlice";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  const socket = useRef();
  //   if (!socket.current) {
  //     socket.current = io("http://localhost:7000");
  //     console.log(socket.current);
  //   }

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz.questions);

  const createGame = (roomId) => {
    console.log(roomId);
    const payload = {
      room: roomId,
      name: "Host",
    };
    socket.current.emit("createRoom", payload, (res) => {
      console.log(res);
    });
    //    dispatch(updateChatLog(payload));
  };
  const startGame = () => {
    socket.current.emit("startGame");
  };

  const joinGame = (config) => {
    socket.current.emit("joinGame", config);
  };

  const submitAnswer = (answer) => {
    socket.current.emit("submitAnswer", answer);
  };

  const nextQuestion = () => {
    socket.current.emit("getNextQuestion");
  };

  useEffect(() => console.log("useEffect"), []);
  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:7000");
      console.log("socket:", socket);

      socket.current.on("joinedGame", (players) => {
        console.log(players);
        dispatch(addPlayers(players));
      });

      socket.current.on("PLAYER-DISCONNECT", (player) => {
        console.log(player);
        dispatch(removePlayer(player.name));
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
        dispatch(finishGame());
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
