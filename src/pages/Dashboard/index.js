import { useContext } from "react" 
import { AuthContext } from "../../contexts/auth"

import Header from "../../components/Header"
import Title from "../../components/Title"

import './dashboard.css'

import { FiPlus, FiMessageSquare, FiSearch, FiEdit } from "react-icons/fi"

import { Link } from "react-router-dom"

export default function Dashboard(){
    const {
        logOut
    } = useContext(AuthContext)

    async function handleLogout(){
        await logOut()
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    <Link to='/new' className="new">
                        <FiPlus size={25}/>
                        Novo Chamado
                    </Link>
                    
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label='Cliente'>Mercado Esquina</td>
                                <td data-label='Assunto'>Suporte</td>
                                <td data-label='Status'>Em Aberto</td>
                                <td data-label='Cadastrado'>12/05/2022</td>
                                <td data-label='#'>
                                    <button>
                                        <FiSearch color="#fff" size={25}/>
                                    </button>
                                    <button>
                                        <FiEdit color="#fff" size={25}/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>
        </div>
    )
} 