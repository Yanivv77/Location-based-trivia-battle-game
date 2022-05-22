import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import GoogleLogin from 'react-google-login'
import { setUser } from '../../features/auth/authSlice'

import axios from 'axios'

export default function LoginButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const responseSuccessGoogle = (response) => {
    var profile = response.getBasicProfile()
    console.log('ID: ' + profile.getId())
    console.log('Name: ' + profile.getName())
    console.log('First Name: ' + profile.getGivenName())
    console.log('Email: ' + profile.getEmail())

    const user = {
      id: profile.getId(),
      name: profile.getGivenName(),
      fullName: profile.getName(),
      email: profile.getEmail(),
    }

    dispatch(setUser(user))
    localStorage.setItem('user', JSON.stringify(user))

    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/users/googlelogin',
      data: { tokenId: response.tokenId },
    }).then((response) => {})
    // navigate("/profile");
  }

  const responseErrorGoogle = (response) => {}

  return (
    <Box className="main">
      <GoogleLogin
        className="socButton"
        clientId="321821941550-rvnh0fb7hm2ojefcrkq0ckdpgehtb3ne.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Box>
  )
}
