import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Box, Paper } from '@mui/material'
import TriviaLocation from '../components/Game/TriviaLocation'
import Helps from '../components/Helps'
//import OnlineUsers from '../components/Game/OnlineUsers'

const GameLobbyScreen = () => {
  const navigate = useNavigate()

  return (
    <>
      <Typography
        variant="h3"
        component="div"
        sx={{
          flexGrow: 1,
          color: '##eeeeee',
          textAlign: 'center',
          mt: 3,
          mb: 3,
        }}
      >
        Game Lobby
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          background: '#ffecb3',
          p: 3,
        }}
      >
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ borderRadius: 10, mt: 5 }}
          onClick={() => {
            navigate('/profile')
          }}
        >
          Go Back
        </Button>
        <Box sx={{ maxWidth: '400px', m: '0 auto' }}>
          <TriviaLocation />
        </Box>

        <Helps></Helps>
      </Paper>
    </>
  )
}

export default GameLobbyScreen
