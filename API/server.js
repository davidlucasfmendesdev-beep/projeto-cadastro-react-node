import 'dotenv/config'; 
import express from "express";
import cors from "cors"; // <--- Importando o CORS
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors()); // <--- Liberando acesso para o React

// Rota de Criar Usuário (POST)
app.post('/users', async (request, response) => {
  const user = await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.nome,   
      age: request.body.idade    
    }
  });
  response.status(201).json(user);
});

// Rota de Listar Usuários (GET)
app.get('/users', async (request, response) => {
  let users = [];

  // Forma correta de verificar se o usuário mandou filtros (query)
  if (Object.keys(request.query).length > 0) {
    users = await prisma.user.findMany({
      where: {
        name: request.query.name,
        email: request.query.email,
        age: request.query.age
      }
    });
  } else {
    // Sem o 'const' aqui para não bugar o escopo da variável!
    users = await prisma.user.findMany(); 
  }
  
  response.status(200).json(users); 
});

// Rota de Atualizar Usuário (PUT)
app.put('/users/:id', async (request, response) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: request.params.id,
      },
      data: {
        email: request.body.email,
        name: request.body.name,
        age: request.body.age
      },
    });
    
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ error: "Usuário não encontrado para atualizar." });
  }
});

// Rota de Deletar Usuário (DELETE)
app.delete('/users/:id', async (request, response) => {
  try {
    await prisma.user.delete({
      where: {
        id: request.params.id,
      },
    });
    response.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    response.status(404).json({ error: "Usuário não encontrado para deletar." });
  }
});

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});

//NkUFHPnIAdZF80DN senha do mongodb