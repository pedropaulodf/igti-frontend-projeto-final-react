import axios from 'axios';

const api = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "https://igti-frontend-desafiofinal-api.herokuapp.com/",
})

export default api;