import Head from "next/head"
import styles from "../../styles/Home.module.scss"
import Image from "next/image"
import { Input } from '../components/ui/input/imput'
import { Button } from "../components/ui/button/button"
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, FormEvent, useState } from "react"
import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {

  const { singIn } = useContext(AuthContext)


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha os dados')
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await singIn(data)
    setLoading(false)
  }

  return (
    //padrão "<></>""
    <>
      <Head>
        <title>Sistema - Faça Seu login</title>
      </Head>

      <div className={styles.ConteinerCenter}>
        <Link href='/'>
          <img src='#' width={190} height={60} />
        </Link>
        <div className={styles.login}>
          <form onSubmit={handleLogin}>


            <Input
              type='text'
              placeholder="Digite seu ID de usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />



            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>


          </form>
          <Link href='/cadastro'>
            <a className={styles.text}>Criar Usuário</a>
          </Link>
        </div>
      </div>

    </>
  )
}
export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})