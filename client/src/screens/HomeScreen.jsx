import Header from '../components/Header'
import React, { useEffect } from 'react'
import { Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Helps from '../components/Helps'

function HomeScreen() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])
  return (
    <>
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
        <Helps></Helps>
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
