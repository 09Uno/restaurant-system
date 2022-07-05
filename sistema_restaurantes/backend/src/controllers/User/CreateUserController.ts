import {Request, response, Response } from 'express'
//import do user service
import {CreateUserService} from "../../services/users/CreateUsersService"
class CreateUserController{
    async handle(req: Request, res: Response){



        //requisição dos dados para ser inseridos no banco de dados
        //os dados virão do req.body
        const {nome, email, password} = req.body
        
        const createUserService = new CreateUserService()
        
        const user = await createUserService.execute({
            nome,
            email,
            password
        })


        return res.json(user)
    }
    
}


export {CreateUserController}