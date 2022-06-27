import {Request, response, Response } from 'express'
//import do user service
import {CreateUserService} from "../../services/users/createUsersService"
class CreateUserController{
    async handle(req: Request, res: Response){

        //requisição dos dados para ser inseridos no banco de dados
        //os dados virão do req.body
        const {name, email, password} = req.body
        
        const createUserService = new CreateUserService()
        
        const user = await createUserService.execute({
            name,
            email,
            password
        })


        return res.json({ok: true})
    }
}


export {CreateUserController}