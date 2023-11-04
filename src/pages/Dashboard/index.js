import { useContext } from "react" 
import { AuthContext } from "../../contexts/auth"

import Header from "../../components/Header"
import Title from "../../components/Title"

import { FiPlus, FiMessageSquare } from "react-icons/fi"

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
                    <Link to='/new'>
                        <FiPlus size={25}/>
                        Novo Chamado
                    </Link>
                    <div className="container">

                    </div>
                </>
            </div>
        </div>
    )
} 