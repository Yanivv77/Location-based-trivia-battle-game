import React from 'react'
import { useState } from 'react'

import useRequest from '../hooks/use-request'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const Login = () => {
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
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            className="my-3"
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="Remember me" />
          {errors}
          <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
            Sign in
          </Button>
        </form>
        <Typography>
          Don't have an account yet?<Link href="signup"> Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login
