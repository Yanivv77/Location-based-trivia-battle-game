import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequest from '../hooks/use-request'

import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

const Signup = () => {
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

  const paperStyle = { padding: '30px 20px', width: 300, margin: '-20px auto' }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField fullWidth label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="age" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {errors}
          <Button className="my-3" type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default Signup
