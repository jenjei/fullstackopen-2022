import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const exportedObject = { // because of warning: "Assign object to a variable before exporting as module default"
  login
}

export default exportedObject