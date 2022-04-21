import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as linked } from 'react-router-dom'
import useRequest from '../hooks/use-request'
import { Grid, Paper, TextField, Button, Typography, Link } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

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

  const paperStyle = { padding: '30px 20px', height: '74vh', width: 300, margin: '-30px auto' }

  const btnStyle = { margin: '8px 0' }
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
            {errors}
            <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
              {t('sign in')}
            </Button>
          </form>
          <Typography>
            {t("don't have an account yet")}
            <Link href="signup"> {t('sign up')}</Link>
          </Typography>
        </Paper>
      </Grid>
      <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        <Button variant="contained" color="default" size="medium" sx={{ borderRadius: 10, mb: 20, p: 0 }} component={linked} to="/">
          back
        </Button>
      </Grid>
    </>
  )
}

export default Login
