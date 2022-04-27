import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import GoogleLogin from 'react-google-login'

import axios from 'axios'

export default function LoginButton() {
  const navigate = useNavigate()
  const responseSuccessGoogle = (response) => {
    console.log(response)
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/auth/google',
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log('Google login success', response)
    })
    navigate('/profile')
  }

  const responseErrorGoogle = (response) => {}

  return (
    <Box className="main">
      <GoogleLogin
        className="socButton"
        clientId="602070662525-cg5up3456lcbdngu7nhji2j6inpi8t1b.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Box>
  )
}
