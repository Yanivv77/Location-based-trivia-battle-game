import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startGame } from '../../features/game/gameSlice'

const LoadingGame = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchQuestions());
    // dispatch(createGame());
    setTimeout(() => dispatch(startGame()), 3000)
  }, [])

  return (
    <div className=" w-55 container d-flex justify-content-center">
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_hzwndued.json"
        background="transparent"
        speed="1"
        loop
        autoplay
      ></lottie-player>
    </div>
  )
}

export default LoadingGame
