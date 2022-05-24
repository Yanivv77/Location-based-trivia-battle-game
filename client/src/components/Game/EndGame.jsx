import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Typography, Box, Paper, Stack } from '@mui/material'

import { initGame } from '../../features/game/gameSlice'

import LeaderBoard from '../LeaderBoard'
import { resetState } from '../../features/quiz/quizSlice'

const EndGame = () => {
  const { currentPlayersAnswers, score } = useSelector((state) => state.quiz)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleExitGame = () => {
    dispatch(resetState())
    navigate('/gamelobby')
  }

  const handleAgainButton = () => {
    dispatch(resetState())
    dispatch(initGame())
  }

  return (
    <>
      <Box sx={{ m: '0 auto' }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mt: 2,
            mb: 2,
            fontWeight: 'bold',
            color: '##eeeeee',
          }}
        >
          Very good !
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            mt: 3,
            mb: 3,
            fontWeight: 'bold',
            color: '##eeeeee',
          }}
        >
          Your score is {score}/10
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <Button variant="contained" color="success" size="large" sx={{ borderRadius: 10 }} onClick={handleAgainButton}>
            Play Again !
          </Button>
          <Button variant="contained" color="success" size="large" sx={{ borderRadius: 10 }} onClick={handleExitGame}>
            Exit Game
          </Button>
        </Stack>
        <LeaderBoard usersList={currentPlayersAnswers} />
      </Box>
    </>
  )
}

export default EndGame
