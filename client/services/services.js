import axios from 'axios'

const api = axios.create({baseURL: "https://zup-finence.azurewebsites.net"})

export default api;