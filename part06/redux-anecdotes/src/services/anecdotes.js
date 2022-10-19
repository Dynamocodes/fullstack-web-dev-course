import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('service:',response.data)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const services = 
  { 
    getAll: getAll,
    create: create
  }
export default services