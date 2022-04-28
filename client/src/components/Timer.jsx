import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Timer({ setTimeOut, questionNumber }) {
  const game = useSelector((state) => state.game.gameOptions);
  const [timer, setTimer] = useState();

  useEffect(() => {
    console.log(timer);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(interval);
      setTimeOut();
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    console.log(questionNumber);
    setTimer(game.gameDuration || 30);
  }, [questionNumber]);
  return timer;
}
