import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Typography, Box, Paper, Stack } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import LeaderBoard from '../components/LeaderBoard'
import ScoreResult from '../components/ScoreResult'
import { resetState } from '../features/quiz/quizSlice'

const EndGame = () => {
  const { quizPlayers, score } = useSelector((state) => state.quiz)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleButtonClick = () => {
    dispatch(resetState())
    navigate('/gamelobby')
  }

  return (
    <>
      <Box
        sx={{
          m: '0 auto',
          maxWidth: { xs: '350px', sm: '400px', md: '500px' },
        }}
      >
        <ScoreResult score={score} />
        <Stack justifyContent="center" alignItems="center" sx={{ m: 2, mb: 3, borderRadius: 5, bgcolor: '#ab47bc', p: 1 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',

              fontWeight: 'bold',
              color: 'white',
            }}
          >
            The WINNER is {quizPlayers[0].name} !
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <Button variant="contained" color="success" size="large" sx={{ borderRadius: 10 }} onClick={handleButtonClick}>
            Go To Profile
          </Button>
        </Stack>
        <LeaderBoard usersList={quizPlayers} />
      </Box>
    </>
  )
}

export default EndGame
