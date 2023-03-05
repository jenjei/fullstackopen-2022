import axios from 'axios'
const baseUrl = '/api/users'

const create = async(newObject) => {
  const response = await axios.post(baseUrl, newObject)
  console.log('user service, post new user')
  return response.data
}

const exportedObject = { // because of warning: "Assign object to a variable before exporting as module default"
  create
}

export default exportedObject