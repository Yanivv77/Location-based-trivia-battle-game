import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const LoadingGameScreen = () => {
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    setTimeout(() => navigate(`/gameroom/${params.id}`), 3000)
  }, [])

  return (
    <div className=" w-55 container d-flex justify-content-center">
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_hzwndued.json"
        background="transparent"
        speed="0.5"
        loop
        autoplay
      ></lottie-player>
    </div>
  )
}

export default LoadingGameScreen
