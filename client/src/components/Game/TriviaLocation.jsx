import React from 'react'
import { Grid, Button, Typography, Box, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import NearByModal from '../Game/NearByModal'
import { useTranslation } from 'react-i18next'
import AnimatedText from 'react-animated-text-content'

const TriviaLocation = () => {
  const { t } = useTranslation(['Game/TriviaLocation'])

  const [open, setOpen] = React.useState(false)

  const navigate = useNavigate()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      {/*<Button
        variant="contained"
        color="success"
        size="medium"
        sx={{ borderRadius: 10, mt: 1 }}
        onClick={() => {
          navigate('/gamelobby')
        }}
      >

        {t("go back")}
      </Button>
      <Box sx={{ maxWidth: "400px", m: "0 auto", mb: 4 }}>

        <Typography
          sx={{
            fontSize: 38,
            textAlign: 'center',
            mt: 0,
            mb: 0,
            fontWeight: 'bold',
            fontFamily: 'Helvetica Neue',
            color: '#000000',
            variant: 'h1',
            display: { xs: 'block' },
          }}
        >
          <AnimatedText
            type="words" // animate words or chars
            animation={{
              x: '200px',
              y: '-20px',
              scale: 1.7,
              ease: 'ease-in-out',
            }}
            animationType="float"
            interval={0.06}
            duration={0.8}
            tag="p"
            className="animated-paragraph "
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
          >
            {t(' Hello Choose Trivia Question Location 😃')}
          </AnimatedText>
        </Typography>
        <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Button variant="contained" size="large" color="secondary" sx={{ borderRadius: 10, mt: 5 }} onClick={handleOpen}>
              {t('near by location')}
            </Button>
          </Grid>

          <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
            <Box sx={{ width: 300, height: 300, display: { xs: 'block', sm: 'none', md: 'block' } }}>
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_tHEtXH.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {/*<Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 10, mt: 5 }}>
              {t('location on map')}
            </Button>*/}
          </Grid>
          <Grid item xs={12}>
            {/*<Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 10, mt: 3 }}>
              {t('location from list')}
            </Button>*/}
          </Grid>
        </Grid>
        <NearByModal open={open} handleClose={handleClose} />
      </Box>
    </>
  )
}

export default TriviaLocation
