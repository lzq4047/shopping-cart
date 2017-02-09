import axios from 'axios'
export const baseURL = 'http://localhost:8080'
let instance = axios.create({
  baseURL,
  timeout: 5000
})
export default instance
