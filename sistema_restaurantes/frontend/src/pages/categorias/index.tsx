import Head from "next/head";
import { Header } from "../../components/header/header";
import { Input } from "../../components/ui/input/imput";
import { Button } from "../../components/ui/button/button";
import styles from './styles.module.scss'
import { useState } from "react";
import { FormEvent } from "react";
import { setupAPIClient } from "../../service/api";
import { toast, ToastContainer } from "react-toastify";
import { defaultConfig } from "next/dist/server/config-shared";
import { canSSRAuth } from "../../utils/canSSRAuth";


export default function Categorias() {

    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault()
        if (name === '') {
            return toast.error('Digite o nome da categoria', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        const apiClient = setupAPIClient();
        await apiClient.post('/categoria', {
            name: name
        })

        toast.success('Categoria Cadastrada com sucesso', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setName('')
    }
        return (
            <>
                <Head>
                    <title>
                        Categorias - Sistemas
                    </title>
                </Head>
                <div>
                    <Header />
                    <main className={styles.Conteiner}>
                        <h1>Nova Categoria</h1>
                        <form className={styles.form} onSubmit={handleRegister}>
                            <input
                                className={styles.input}
                                placeholder="Digite o nome da categoria"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            ></input>

                            <button className={styles.button}>
                                Cadastrar Categoria
                            </button>
                        </form>
                    </main>
                </div>

            </>
        )
    }

    export const getServerSideProps = canSSRAuth(async (ctx)=>{
        return {props:{}
        
         }
    })