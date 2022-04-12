import React from 'react'
import { useState } from 'react'
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import useRequest from '../hooks/use-request'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const Login = () => {
  const { t } = useTranslation(["login"]);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/users/login',
    method: 'post',
    body: {
      email,
      password,
    },
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    await doRequest()
  }

  const paperStyle = { padding: '30px 20px', height: '74vh', width: 300, margin: '-30px auto' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnStyle = { margin: '8px 0' }
  return (
    <Grid>
      <Paper elevation={13} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>{t("sign in")}</h2>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            className="my-3"
            label={t("email")}
            placeholder="Enter email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label={t("password")}
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label={t("remember me")} />
          {errors}
          <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
          {t("sign in")}
          </Button>
        </form>
        <Typography>
         {t("don't have an account yet")}<Link href="signup">  {t("sign up")}</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login
