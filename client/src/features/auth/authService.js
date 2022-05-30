import axios from 'axios'

//Base URL to Users Service
const API_URL = 'https://worldtrivia.herokuapp.com/api/users/signup'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'create', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
