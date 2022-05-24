import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import GoogleLogin from 'react-google-login'
import { setUser } from '../../features/auth/authSlice'

import axios from 'axios'
import { useGoogleApi } from 'react-gapi'

export default function LoginButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const responseGoogle = (response) => {
    var profile = response.tokenId
    console.log(profile)
    //console.log('ID: ' + profile.getId())
    //console.log('Name: ' + profile.getName())
    //console.log('First Name: ' + profile.getGivenName())
    //console.log('Email: ' + profile.getEmail())

    const user = {
      id: profile.clientId,
      name: '',
      //fullName: profile.getName(),
      //email: profile.getEmail(),
    }

    dispatch(setUser(user))
    localStorage.setItem('user', JSON.stringify(user))

    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/users/googlelogin',
      data: { tokenId: response.clientId },
    }).then((response) => {
      console.log(response)
    })
    navigate('/profile')
  }

  const responseErrorGoogle = (response) => {}

  const [loginData, setLoginData] = useState(localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null)

  const handleFailure = (result) => {
    console.log(result)
  }

  const handleLogin = async (googleData) => {
    const res = await fetch('api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    console.log(JSON.stringify(data))
    setLoginData(data)
    localStorage.setItem('loginData', JSON.stringify(data))
    navigate('/profile')
  }
  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLoginData(null)
  }

  export function MyAuthComponent() {
    const gapi = useGoogleApi({
      scopes: ['profile'],
      plugin_name: 'chat',
    })

    const auth = gapi?.auth2.getAuthInstance()

    return (
      <Box className="main">
        <div>
          !auth ? <span>Loading...</span>: auth?.isSignedIn.get() ? `Logged in as "${auth.currentUser.get().getBasicProfile().getName()}"` :{' '}
          <button onClick={() => auth.signIn()}>Login</button>
        </div>

        <GoogleLogin
          clientId={'321821941550-75ebsv7rpq6appdh0l5o88n6uvb34hvc.apps.googleusercontent.com'}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        ></GoogleLogin>
      </Box>
    )
  }
}
