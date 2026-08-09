import axios from 'axios'

const api = axios.create({
  baseURL: 'http://projeto-cadastro-react-node.onrender.com/' // <-- O seu link do Render aqui!
})

export default api