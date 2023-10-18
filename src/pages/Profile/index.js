import { useState, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './profile.css'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/auth'

export default function Profile(){

    const { user, storageUser, setUser, logOut } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === 'image/jpeg' || image.type === 'image.png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                toast.error('Envie uma imagem do tipo PNG ou JPEG')
                setImageAvatar(null)
                return;
            }
        }
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='Minha conta'>
                    <FiSettings size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25}/>
                            </span>

                            <input type='file' accept='image/*' onChange={handleFile} /><br/>
                            {avatarUrl === null ? (
                                <img src={avatar} alt='Foto de perfil' width={250} height={250} /> 
                                ) : (
                                <img src={avatarUrl} alt='Foto de perfil' width={250} height={250} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type='text'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label>Email</label>
                        <input type='text' value={email} disabled={true} />
                    
                        <button type='submit'>Salvar</button>
                    </form>
                </div><br/>

                <div className='container'>
                    <button className='logout-btn' onClick={() => logOut()}>Sair</button>
                </div>

            </div>
        </div>
    )
}