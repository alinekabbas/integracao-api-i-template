import axios from "axios"
import { useEffect, useState } from "react"

export const Usuario = (props) => {
    const [usuario, setUsuario] = useState({})
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [editar, setEditar] = useState(false)

    const pegarUsuariosPeloId = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`
            , {
                headers: {
                    Authorization: 'aline-kabbas-ammal'
                }
            })
            .then((resposta) => {
                setUsuario(resposta.data)
                console.log(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    useEffect(() => {
        pegarUsuariosPeloId()
    }, [])


    const editarUsuario = () => {
        const body = {
            name: nome,
            email: email
        }

        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, body, {
            headers: {
                Authorization: 'aline-kabbas-ammal'
            }
        })
            .then((resposta) => {
                pegarUsuariosPeloId()
                setEditar(!editar)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    const deletarUsuario = ()=>{
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, {
            headers: {
                Authorization: 'aline-kabbas-ammal'
            }
        }).then((resposta)=>{
            alert("Usuário removido com sucesso")
            props.pegarUsuarios()
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    return (
        <>

            {
                editar ?
                    <div>
                        <input
                            placeholder="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={editarUsuario}>Alterar Usuário</button>
                    </div>:
                    <div>
                        <p>{usuario.name}</p>
                        <p>{usuario.email}</p>
                    </div>
            }
            <button onClick={()=> setEditar(!editar)}>Editar</button>
            <button onClick={deletarUsuario}>Deletar</button>
            
        </>
    )
}