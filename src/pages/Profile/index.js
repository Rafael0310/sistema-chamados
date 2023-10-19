import { useState, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './profile.css'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/auth'

import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../services/firebaseConnection'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function Profile(){

    const { user, storageUser, setUser, logOut } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)
    const [nome, setNome] = useState(user && user.name)
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

    async function handleUpload(){
        const currentUid = user.uid
        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
    
        const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
            
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                let urlFoto = downloadURL

                const docRef = doc(db, 'users', user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    name: nome
                }).then(() => {
                    let data = {
                        ...user,
                        name: nome,
                    }
    
                    setUser(data)
                    storageUser(data)
                    toast.success('Atualizado com sucesso')
                })
            })
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(imageAvatar === null && nome !== ''){
            // Atualizar apenas o nome
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                name: nome
            }).then(() => {
                let data = {
                    ...user,
                    name: nome,
                }

                setUser(data)
                storageUser(data)
                toast.success('Atualizado com sucesso')
            })
        }else if(nome!== '' && imageAvatar !== null){
            // Atualizar o nome e a foto
            handleUpload()
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
                    <form className='form-profile' onSubmit={handleSubmit}>
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