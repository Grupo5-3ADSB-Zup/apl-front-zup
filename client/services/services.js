import axios from 'axios'

const api = axios.create({baseURL: "https://api-zup.azurewebsites.net/"})

export default api;
