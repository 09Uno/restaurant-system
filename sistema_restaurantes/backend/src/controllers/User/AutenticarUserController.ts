import { Request, Response } from "express";

import {AutenticarUserService} from  '../../services/users/AutenticarUserService'

class AutenticarUserController{
    async handle(req: Request, res: Response){

        const {email, password}= req.body

        const autenticar = new AutenticarUserService()

        const autent  = await autenticar.execute({
            email,
            password
        }) 

        

            return res.json(autent)
    }
    

}

export {AutenticarUserController}