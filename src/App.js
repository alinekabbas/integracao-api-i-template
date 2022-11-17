import React, { useEffect, useState } from "react";
import axios from "axios";
import { Usuario } from "./components/Usuario";

// const usuariosLocal = [
//   {
//     id: 1,
//     name: "Muri"
//   },
//   {
//     id: 2,
//     name: "Paulinha"
//   },
//   {
//     id: 1,
//     name: "Marcelo"
//   },
//   {
//     id: 1,
//     name: "Rodrigo"
//   },
// ]

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")

  const pegarUsuarios = () => {
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users', {
      headers: {
        Authorization: "aline-kabbas-ammal"
      }
    })
      .then((resposta) => {
        setUsuarios(resposta.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  useEffect(() => {
    pegarUsuarios()
  }, [])

  const criarUsuario = () =>{
    const body = {
      name: nome,
      email: email
    }

    axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users', body, {
      headers: {
        Authorization: "aline-kabbas-ammal"
      }
    })
    .then((resposta)=>{
      alert("Usuário cadastrado com sucesso")
      pegarUsuarios()
      setNome("")
      setEmail("")
    })
    .catch((erro)=>{
      alert(erro.response.data.message)
    })
  }

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br/>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br/>
      <button onClick={criarUsuario}>Criar usuário</button>

      {usuarios.map((usuario) => {
        return <Usuario
          key={usuario.id}
          id={usuario.id}
          pegarUsuarios={pegarUsuarios}
        />
      })}
    </>
  )
}

export default App;
