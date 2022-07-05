
import prismaClient from '../../prisma/prisma'
import {hash} from 'bcryptjs'


interface UseRequest{
    nome:string;
    email:string;
    password:string;
}

class CreateUserService{
    async execute({nome, email, password}: UseRequest){
        
        if(!email){
            throw new Error("Email inválido")
        }

        const userJaExiste = await prismaClient.user.findFirst({where:{
            email: email
        }})
        if(userJaExiste){
            throw new Error("Email já cadastrado");
            
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                nome: nome,
                email: email,
                password:passwordHash,

            }, select:{
                id: true,
                nome: true,
                email: true,
            }

        })
        

        return user
    }
}

export {CreateUserService}