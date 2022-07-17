import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { type } from 'os';
import { createContext, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { api } from '../service/apiClient'
import path from 'path';
import {toast} from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean
    singIn: (credentiols: SingProps) => Promise<void>;
    singOut: () => void
    singUp: (credentiols: SingUpProps) => Promise<void>;
}

type SingProps = {
    email: string;
    password: string
}

type SingUpProps = {
    nome: string;
    email: string;
    password: string;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

//função para deslogar usuário
export function singOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(()=>{

        const {'@nextauth.token': token} = parseCookies();

        if(token){
            api.get('/me').then(response=>{

                const {id, name, email} = response.data

                setUser({
                    id,
                    name,
                    email,
                })
            })
        }


    },[])




    //função para deslogar usuário
    async function singIn({ email, password }: SingProps) {
        try {
            const response = await api.post('/autenticar', {
                email,
                password
            })

            const { id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setUser({
                id,
                name,
                email,
            })

            toast.success("Bem Vindo!")
            Router.push('/dashboard')
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            console.log(response.data)
        } catch (err) {
            toast.error("Erro ao Logar")
            console.log('erro ao acessar')
        }
    }

    //função para criar usuário
    async function singUp({nome, email, password }:SingUpProps) {
        try {
            const response = await api.post('/users',{
                nome,
                email,
                password
            })
            toast.success("Conta criada com sucesso!")
            Router.push('/')
        } catch (err) {
            toast.error("Erro ao Criar conta")
            console.log("erro ao cadastrar")
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, singIn, singOut, singUp }}>
            {children}
        </AuthContext.Provider>
    )
}