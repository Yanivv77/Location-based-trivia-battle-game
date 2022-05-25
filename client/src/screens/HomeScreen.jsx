import Header from '../components/Shared/Header'
import React, { useEffect } from 'react'
import { Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'

function HomeScreen() {
  const [width, height] = useWindowSize()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])
  return (
    <>
      <Confetti width={width} height={height} numberOfPieces={120} opacity={0.5} />
      <Header />
      <div>
        <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 10, mt: 2, p: 2, px: 8 }}
              component={Link}
              to="/login"
            >
              Login to Play
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ borderRadius: 10, mt: 3, mb: 0, p: 2, px: 6 }}
              component={Link}
              to="/signup"
            >
              Create New User
            </Button>
          </Grid>
        </Grid>

        <div className=" w-55 container d-flex justify-content-center">
          <lottie-player
            src="https://assets4.lottiefiles.com/private_files/lf30_c7xcgjbt.json"
            background="transparent"
            speed="0.5"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </>
  )
}

export default HomeScreen
