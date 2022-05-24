import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Grid, Paper, Typography, TextField, Button, Box } from '@mui/material'

const Signup = () => {
  const { t } = useTranslation(['signup'])

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/users/signup',
    method: 'post',
    body: {
      username,
      email,
      password,
      age,
    },
    onSuccess: () => navigate('/'),
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    await doRequest()
  }

  const divStyle = {}
  const paperStyle = {
    padding: '30px 20px',
    height: '76vh',
    width: 300,
    margin: '20px auto',
  }
  const headerStyle = { margin: 0 }

  return (
    <div style={divStyle}>
      <Grid>
        <Paper elevation={22} style={paperStyle}>
          <Grid align="center">
            <div className=" w-50 h-75 container d-flex justify-content-center width">
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_ymbzgxgc.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
            <h2 style={headerStyle}>{t('sign up')}</h2>
            <Typography variant="caption" gutterBottom>
              {t('please fill this form to create an account')}
            </Typography>
          </Grid>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label={t('username')}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label={t('email')}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField fullWidth label={t('age')} placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
            <TextField
              fullWidth
              label={t('password')}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Button className="my-3" type="submit" variant="contained" color="primary">
              {t('sign up')}
            </Button>
          </form>
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
        </Paper>
        <div className="d-flex justify-content-center">
          <div
            style={{
              width: '80vh',
              margin: '14',
            }}
          >
            <br />
            {errors}
          </div>
        </div>
      </Grid>
    </div>
  )
}

export default Signup
