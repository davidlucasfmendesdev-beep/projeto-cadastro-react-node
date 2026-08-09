import axios from 'axios'

const api = axios.create({
  baseURL: 'https://projeto-cadastro-react-node.onrender.com/' // <-- O seu link do Render aqui!
})

export default api