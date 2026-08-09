import { useEffect, useState, useRef } from "react";
import "./style.css";
import lixeira from "../../assets/lixeira.svg";
import api from '../../services/api';

function Home() {
  // 1. Criamos os States e Referências
  const [users, setUsers] = useState([]);
  
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // 2. Função para buscar os usuários
  async function getUsers() {

    const response = await api.get('/users');
    setUsers(response.data);
    console.log(users)
  }

  // 3. Função para cadastrar novo usuário
  async function createUsers(event) {
    event.preventDefault();

    await api.post('/users', {
      nome: inputName.current.value,
      idade: inputAge.current.value,
      email: inputEmail.current.value
    });

    // Limpa os campos depois de cadastrar
    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";

    // Atualiza a lista na tela
    getUsers();
  }

  // 4. Função para deletar usuário
  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
    
    // Atualiza a lista na tela
    getUsers();
  }

  // 5. Executa a busca de usuários assim que a tela abre
  useEffect(() => {
    async function loadInitialUsers() {
      const response = await api.get('/users');
      setUsers(response.data);
    }
    
    loadInitialUsers();
  }, []);

  return (
    <div className="container">
      <form onSubmit={createUsers}>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" ref={inputName} />
        <input placeholder="Idade" type="number" ref={inputAge} />
        <input placeholder="E-mail" type="email" ref={inputEmail} />
        <button type="submit">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={lixeira} alt="Deletar" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;