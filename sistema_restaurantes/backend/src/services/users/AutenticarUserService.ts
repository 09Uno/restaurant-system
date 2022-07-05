
import prismaClient from "../../prisma/prisma";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken"

interface AuthRequest{
    email:string;
    password:string;
}

class AutenticarUserService{
    async execute({email, password}: AuthRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                email:email
                
            }
        })

        if(!user){
            throw new Error("Usuário ")
        }
        const verificaSenha = await compare(password, user.password)

        if(!verificaSenha){
            throw new Error("Usuário ou senha incorretos")           
        }

        const token = sign({
            nome: user.nome,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject:user.id,
            expiresIn:'30d'
        }
        )

    return {
        id: user.id,
        name: user.nome,
        email: user.email,
        token: token
    }
    }

    
}

export {AutenticarUserService};