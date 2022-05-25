import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography, Box, Slider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MultiUsers from '../Game/MultiUsers'
import { useDispatch, useSelector } from 'react-redux'
import { initGame, createGame, setTimer } from '../../features/game/gameSlice'

const GameOptions = () => {
  const { secondsPerQuestion } = useSelector((state) => state.game.gameOptions)
  const [multi, setMulti] = useState(false)
  const [value, setValue] = useState(secondsPerQuestion || 30)

  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    dispatch(setTimer(newValue))
  }

  useEffect(() => {
    console.log(secondsPerQuestion)
  }, [value])
  return (
    <>
      {!multi ? (
        <>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mt: 1,

              fontWeight: 'bold',
              color: '##eeeeee',
            }}
          ></Typography>
          <Button
            variant="contained"
            color="success"
            size="medium"
            sx={{ borderRadius: 10, mb: 1 }}
            onClick={() => {
              dispatch(initGame())
            }}
          >
            Go Back
          </Button>
          <Box sx={{ maxWidth: '400px', m: '0 auto' }}>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%', mt: 3 }}>
              <Grid item xs={12}>
                <Box sx={{ width: 200 }}>
                  <Typography
                    color="primary"
                    id="discrete-slider-custom"
                    gutterBottom
                    sx={{
                      textAlign: 'center',
                      mt: 1,

                      fontWeight: 'bold',
                      color: '##eeeeee',
                    }}
                  >
                    {secondsPerQuestion} Seconds Per Question
                  </Typography>
                  <Slider
                    value={secondsPerQuestion}
                    aria-label="Timer"
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={10}
                    max={30}
                    color="secondary"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: 10, mt: 1, mb: 1 }}
                  onClick={() => {
                    // dispatch(fetchQuestions());
                    dispatch(createGame())
                    setMulti(true)
                  }}
                >
                  Start Game
                </Button>
              </Grid>
              <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
                <Box sx={{ width: 300, height: 250, display: { xs: 'block', sm: 'none', md: 'block' } }}>
                  <lottie-player
                    src="https://assets8.lottiefiles.com/packages/lf20_igywev6p.json"
                    background="transparent"
                    speed="0.4"
                    autoplay
                  ></lottie-player>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <MultiUsers />
      )}
    </>
  )
}

export default GameOptions
