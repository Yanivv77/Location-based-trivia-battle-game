import React, { useEffect, useState, useContext } from 'react'
import { Grid, Button, Typography, Box, Paper, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { resetState } from '../features/quiz/quizSlice'
import BetweenQuestionsModal from '../components/Game/BetweenQuestionsModal'
import HelperModal from '../components/Game/HelperModal'
import Timer from '../components/Timer'
import Helps from '../components/Helps'
import { WebSocketContext } from '../components/Websocket/WebSocket'

const GameRoomScreen = () => {
  const { quizPlayers, currentQuestion, currentQuestionNumber, currentAnswer, score } = useSelector((state) => state.quiz)
  const { waitTillNextQuestion } = useSelector((state) => state.game.gameOptions)

  const [open, setOpen] = useState(false)
  const [timeFinished, setTimeFinished] = useState(false)

  const [gameFinished, setGameFinished] = useState(false)

  const [answers, setAnswers] = useState(currentQuestion?.answers || [])
  const [clicked, setClicked] = useState(false)
  const [helperOpen, setHelperOpen] = useState(false)

  const ws = useContext(WebSocketContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isHalfAnswersUsed } = useSelector((state) => state.game.helpers)

  const handleOpen = () => setOpen(true)

  const delay = (timer, callback) => {
    setTimeout(() => callback(), timer)
  }
  const handleClose = () => setOpen(false)

  const handleExitGame = () => {
    dispatch(resetState())
    ws.socket.current.disconnect()
    ws.socket.current.connect()
    navigate('/gamelobby')
  }

  const handleTimeout = () => {
    if (!clicked) {
      setTimeFinished(true)
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 4000)
    }
  }

  const moveToNextQuestion = () => {
    console.log('MoveToNextQuestion')
  }

  const handleAnswer = (answer) => {
    if (!clicked) {
      setClicked(true)
      ws.submitAnswer(answer)
    }
  }

  useEffect(() => {
    if (currentAnswer) {
      setTimeout(() => {
        handleOpen()
      }, 1000)
    } else {
      setClicked(false)

      setTimeFinished(false)
      handleClose()
      setAnswers(currentQuestion?.answers)
    }
  }, [currentAnswer, currentQuestion])

  useEffect(() => {
    if (ws.socket.current) {
      ws.socket.current?.on('gameFinished', () => {
        setGameFinished(true)
      })
    }
  }, [ws])
  useEffect(() => {
    if (gameFinished) {
      setTimeout(() => navigate(`/endgamescreen`), 1500)
    }
  }, [gameFinished])

  if (waitTillNextQuestion) {
    return (
      <Box
        sx={{
          maxWidth: '400px',
          m: '0 auto',

          position: 'relative',
        }}
      >
        <Stack justifyContent="center" alignItems="center" sx={{ m: 2, mb: 3, p: 1 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
            }}
          >
            Please wait till next question !
          </Typography>
        </Stack>
        <div className=" w-55 container d-flex justify-content-center">
          <lottie-player
            src="https://assets4.lottiefiles.com/private_files/lf30_c7xcgjbt.json"
            background="transparent"
            speed="0.5"
            loop
            autoplay
          ></lottie-player>
        </div>
      </Box>
    )
  }

  return (
    <>
      {currentQuestion && (
        <>
          {' '}
          <Button variant="contained" color="success" size="large" sx={{ borderRadius: 10, mt: 5 }} onClick={handleExitGame}>
            EXIT GAME
          </Button>
          <Box
            sx={{
              maxWidth: { xs: '350px', sm: '400px', md: '500px' },
              m: '0 auto',
              position: 'relative',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',

                fontWeight: 'bold',
                color: '##eeeeee',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              Time left :{' '}
              <Timer
                currentQuestion={currentQuestionNumber}
                moveToNextQuestion={moveToNextQuestion}
                currentAnswer={currentAnswer}
                handleTimeout={handleTimeout}
                players={quizPlayers}
              />
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',

                fontWeight: 'bold',
                color: '##eeeeee',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              Score : {score}
            </Typography>
            <Box>
              <Grid container spacing={2} sx={{ width: '100%', mt: 3 }}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      pb: 2,
                      mt: 3,
                      mb: 3,
                      borderRadius: '10px',
                      minHeight: '200px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: 'center',

                        fontWeight: 'bold',
                        color: '##eeeeee',
                        mb: 2,
                      }}
                    >
                      Question <span className={{ fontSize: '15px', color: 'red' }}>{currentQuestionNumber}</span>
                      /10
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: 'center',

                        fontWeight: 'bold',
                        color: '##eeeeee',
                      }}
                    >
                      {currentQuestion.question}
                    </Typography>
                  </Paper>
                </Grid>
                {answers?.length &&
                  answers.map((answer) => (
                    <Grid item xs={12} sm={6}>
                      <Stack justifyContent="center" alignItems="center">
                        <Button
                          variant="contained"
                          size="large"
                          //     disabled={clicked}
                          sx={{
                            minWidth: '150px',
                            borderRadius: 10,

                            backgroundColor: 'secondary.main',
                            '&:hover': {
                              backgroundColor: 'secondary.dark',
                            },
                          }}
                          onClick={() => handleAnswer(answer.text)}
                        >
                          {answer.text}
                        </Button>
                      </Stack>
                    </Grid>
                  ))}
              </Grid>
              <Helps answers={answers} setAnswers={setAnswers} setOpen={() => setHelperOpen(true)}></Helps>
            </Box>
          </Box>
          <BetweenQuestionsModal open={open} handleClose={handleClose} timeFinished={timeFinished} />
          <HelperModal open={helperOpen} handleClose={() => setHelperOpen(false)} statisticAnswers={currentQuestion.statistics.perAnswer} />
        </>
      )}
    </>
  )
}

export default GameRoomScreen
