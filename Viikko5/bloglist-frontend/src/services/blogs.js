
import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.post(baseUrl, blog, config)
  return result.data
}

export default { getAll, setToken, create }
