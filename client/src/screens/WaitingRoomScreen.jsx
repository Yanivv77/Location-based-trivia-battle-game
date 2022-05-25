import React, { useEffect, useState, useContext } from 'react'
import { Grid, Button, Typography, Box, Paper, Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { WebSocketContext } from '../components/Websocket/WebSocket'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import GoogleButton from '../components/Login/LoginButton'
import { logout } from '../features/auth/authSlice'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const WaitingRoomScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  //   const { t } = useTranslation(["Waitingroom"]);

  const [gameStarted, setGameStarted] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestInput, setGuestInput] = useState(false)
  const [joined, setJoined] = useState(false)


  const invitedPlayers = useSelector((state) => state.quiz.quizPlayers);
  const { user } = useSelector((state) => state.auth);
  const { isActive } = useSelector((state) => state.game.gameOptions);
  const ws = useContext(WebSocketContext);


  const navigate = useNavigate()

  const delay = (timer, callback) => {
    setTimeout(() => callback(), timer)
  }
  const handleClick = (name) => setGuestName(name)

  //   const handleExitGame = () => {
  //     dispatch(resetState());
  //     navigate("/profile");
  //   };

  const handleJoin = () => {
    setJoined(true)
    const userToJoin = user ? { ...user, roomId: params.id } : { name: guestName, roomId: params.id }
    const config = { room: params.id, user: userToJoin }
    ws.joinGame(config)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    console.log(params)
    console.log(ws.socket.current)
    if (ws.socket.current) {
      console.log(ws.socket.current.connected)
      ws.socket.current?.on('gameStarted', () => {
        setGameStarted(true)
      })
    }
  }, [ws])
  useEffect(() => {

    if (gameStarted || isActive) {
      navigate(`/loadinggame/${params.id}`);
    }
  }, [gameStarted, isActive]);


  return (
    <>
      <Button variant="contained" size="large" color="secondary" sx={{ borderRadius: 10, mt: 5 }} onClick={handleLogout} disabled={!user}>
        Log out
      </Button>
      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
          {user && <h4>Welcome , {user.name}</h4>}
          {!user && guestName && <h3>Welcome , {guestName}</h3>}
        </Grid>
        {joined ? (
          <h4>Please wait till Host will start the game</h4>
        ) : (
          !user && (
            <>
              <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                <Stack justifyContent="center" alignItems="center" spacing={2}>
                  <h5> SIGN UP with Google Account</h5>
                  <GoogleButton></GoogleButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Stack justifyContent="center" alignItems="center" spacing={2}>
                  <h5>Or Join as guest</h5>
                  {guestInput ? (
                    <TextField
                      required
                      id="standard-required"
                      label="Name"
                      variant="standard"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      sx={{ p: 2 }}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      sx={{ borderRadius: 10, mt: 5 }}
                      onClick={() => setGuestInput(true)}
                    >
                      For GUESTS
                    </Button>
                  )}
                </Stack>
              </Grid>
            </>
          )
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ borderRadius: 10, mt: 5 }}
            onClick={handleJoin}
            disabled={(!user && !guestName) || joined}
          >
            Join Game
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ width: '60%', m: '30px auto' }}>
        <Stack spacing={2}>
          {invitedPlayers.map((player) => (
            <Item key={player.id}>{player.name} is online</Item>
          ))}
        </Stack>
      </Box>
    </>
  )
}
export default WaitingRoomScreen
