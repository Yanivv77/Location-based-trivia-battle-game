import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Timer({
  moveToNextQuestion,
  currentQuestion,
  currentAnswer,
  handleTimeout,
  clicked,
  players,
}) {
  const game = useSelector((state) => state.game.gameOptions);
  const [timer, setTimer] = useState(game.secondsPerQuestion || 30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (currentAnswer && players.length === 1) {
      console.log("clicked:", clicked);
      clearInterval(interval);
    }

    if (timer === 0) {
      clearInterval(interval);

      setTimeout(() => {
        console.log(" timeout modal");
        handleTimeout();
      }, 500);
      setTimeout(() => {
        console.log(" timeout next question");
        moveToNextQuestion();
      }, 2000);
      // if (currentAnswer) {
      //   setTimeout(() => {
      //     moveToNextQuestion();
      //   }, 1500);
      // } else {
      //   handleTimeout()
      //   moveToNextQuestion();
      // }
    }
    return () => clearInterval(interval);
  }, [timer, currentAnswer]);

  useEffect(() => {
    setTimer(game.secondsPerQuestion || 30);
  }, [currentQuestion]);
  return timer;
}
