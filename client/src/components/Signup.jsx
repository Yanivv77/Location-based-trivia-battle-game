import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

const Signup = () => {
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
        <form>
          <TextField fullWidth label="Username" placeholder="Enter your username" />
          <TextField fullWidth label="Email" placeholder="Enter your email" />
          <TextField fullWidth label="Password" placeholder="Enter your password" />
          <TextField fullWidth label="Confirm Password" placeholder="Confirm your password" />

          <Button className="my-3" type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default Signup
