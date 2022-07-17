import Head from "next/head"
import { Header } from "../../components/header/header"
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { useState, ChangeEvent, FormEvent } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { setupAPIClient } from "../../service/api"
import { type } from "os"
import { toast } from "react-toastify"

type ItemProps = {
    id: string;
    name: string;
}

interface categoryProps {
    categoryList: ItemProps[];
}



export default function Produtos({ categoryList }: categoryProps) {

    const [url, setUrl] = useState('');
    const [img, setImg] = useState(null)

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');



    const [categorias, setCategorias] = useState(categoryList || []);
    const [categoriasSelect, setCategoriasSelect] = useState('');

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]

        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'img/png') {

            setImg(image);
            setUrl(URL.createObjectURL(e.target.files[0]))

        }
    }

    function handleChangeCategory(e) {

        setCategoriasSelect(e.target.value)
    }

   async function handleRegister(e: FormEvent){

        e.preventDefault();

        try {
            const data = new FormData();

            if(name ==='' || price ==='' || description === '' || img === null){
                toast.error('Preencha todos os campos')
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description);
            data.append('category_id', categorias[categoriasSelect].id)
            data.append('file', img)

            const apiClient = setupAPIClient();

            await apiClient.post('/produtos', data)

            toast.success("Cadastrado com sucesso")
        } catch (err) {
            toast.error("Erro ao fazer o cadastro")
        }


        setName('')
        setPrice('')
        setDescription('')
        
        setImg(null)
        setUrl('')

    }

    return (
        <>
            <Head>
                <title>Produtos - Sistemas</title>
            </Head>
            <div>
                <Header />

                <main className={styles.Conteiner}>


                    <h1>Adicionar Produto</h1>
                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.label}>
                            <span>
                                <FiUpload size={25} color='#FFF' />
                            </span>

                            <input type="file" accept="image/pnf, image/jpeg" onChange={handleFile} />

                            {url && (

                                <img
                                    className={styles.preview}
                                    src={url} alt="Foto do Produto"
                                    width={250}
                                    height={250}
                                />
                            )}



                        </label>



                        <select value={categoriasSelect} onChange={handleChangeCategory}>
                            {categorias.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input placeholder="Digite o nome do produto"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />



                        <input placeholder="Digite o preço do produto"
                            className={styles.input}
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        />

            
                        <textarea placeholder="Descreva o seu produto"
                            className={styles.input} 
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                                />

                        <button className={styles.buttonAdd} type="submit">Cadastrar</button>
                    </form>

                </main>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/categoria')

    return {
        props: { categoryList: response.data }
    }
})