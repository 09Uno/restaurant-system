import Head from "next/head"
import styles from "../../../styles/Home.module.scss"
import Image from "next/image"
import { Input } from '../../components/ui/input/imput'
import { Button } from "../../components/ui/button/button"
import Link from 'next/link'
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useState, FormEvent } from "react"
import { canSSRGuest } from "../../utils/canSSRGuest"

export default function Cadastro() {

  const { singUp } = useContext(AuthContext)

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if (nome === '' || email === '' || password === '') {
      alert('preencha os campos')
      return;
    }

    setLoading(true)

    let data = {
      nome,
      email,
      password

    }

    await singUp(data)

    setLoading(false);


  }

  return (
    <>
      <Head>
        <title>Sistema - Faça Seu Cadastro</title>
      </Head>

      <div className={styles.ConteinerCenter}>
        <Link href='/'>
          <img src='#' width={190} height={60} />
        </Link>
        <div className={styles.login}>
          <form onSubmit={handleSingUp}>
            <h1>Criar Usuário</h1>

            <Input
              type='text'
              placeholder="Digite seu Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

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
              loading={false}
            >
              Cadastrar
            </Button>


          </form>
          <Link href='/'>
            <a className={styles.text}>Acessar usuário existente</a>
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