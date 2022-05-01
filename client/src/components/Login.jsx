import React from 'react'
import useRequest from '../hooks/use-request'
import LoginButton from './LoginButton'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as linked } from 'react-router-dom'
import { Grid, Paper, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { t } = useTranslation(['login'])
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/users/login',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => navigate('/profile'),
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    await doRequest()
  }

  const paperStyle = { padding: '30px 20px', height: '76vh', width: 300, margin: '-20px auto' }

  const btnStyle = { margin: '0px 0' }
  return (
    <>
      <Grid>
        <Paper elevation={13} style={paperStyle}>
          <Grid align="center">
            <div className=" w-50 h-75 container d-flex justify-content-center width">
              <lottie-player
                src="https://assets4.lottiefiles.com/private_files/lf30_iraugwwv.json"
                background="transparent"
                speed="2"
                loop
                autoplay
              ></lottie-player>
            </div>

            <h2>{t('sign in')}</h2>
          </Grid>
          <form onSubmit={onSubmit}>
            <TextField
              className="my-3"
              label={t('email')}
              placeholder="Enter email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label={t('password')}
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label={t('remember me')} />

            <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
              {t('sign in')}
            </Button>
          </form>
          <Typography component={'span'}>
            {t("don't have an account yet")}
            <Link href="signup"> {t('sign up')}</Link>
            <LoginButton></LoginButton>
          </Typography>

          <Button variant="contained" color="secondary" size="medium" sx={{ borderRadius: 10, mt: 2, p: 0 }} component={linked} to="/">
            back
          </Button>
        </Paper>
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

export default Login
