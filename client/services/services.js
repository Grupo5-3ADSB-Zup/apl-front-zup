import axios from 'axios'

const api = axios.create({baseURL: "https://apl-back-end-zup.azurewebsites.net/"})

export default api;
