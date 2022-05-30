import axios from 'axios'
export default axios.create({
  baseURL: 'https://worldtrivia.herokuapp.com/api/users/',
  headers: {
    'Content-type': 'application/json',
  },
})
