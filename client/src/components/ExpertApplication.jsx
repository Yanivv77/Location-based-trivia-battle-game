import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequest from '../hooks/use-request'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Grid, Typography, Button, Box, TextareaAutosize } from '@mui/material'

const ExpertApplication = () => {
  const { t } = useTranslation(['signup'])

  const navigate = useNavigate()
  const [application, setApplication] = useState('')

  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/users/signup',
    method: 'post',
    body: {},
    onSuccess: () => navigate('/'),
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    await doRequest()
  }

  const headerStyle = { margin: 0 }

  return (
    <>
      <Grid align="center">
        <Grid align="center">
          <Box style={{ padding: '20px 20px', width: 200, margin: '-20px auto' }}>
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_onebalwt.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </Box>
          <h2 style={headerStyle}>{t('Apply for expert account')}</h2>
          <Typography variant="caption" gutterBottom>
            {t('What would make you a good expert?')}
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="application"
            style={{ width: '35vh' }}
            label={t('Application')}
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          />
        </form>
        <Button className="my-3" type="submit" variant="contained" color="primary">
          {t('apply')}
        </Button>
        <Box container spacing={5} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
          <Button
            className="my-7 mr-4"
            variant="contained"
            color="secondary"
            size="medium"
            sx={{ borderRadius: 10, mb: 0, p: 0 }}
            component={Link}
            to="/"
          >
            back
          </Button>
        </Box>

        <div className="d-flex justify-content-center">
          <div
            style={{
              width: '74vh',
              margin: '4',
            }}
          >
            <br />
            {errors}
          </div>
        </div>
      </Grid>
    </>
  )
}

export default ExpertApplication
