
//bibioteca de rotas
import { Router, Request, Response } from "express";

//controler para criação dos users
import { CreateUserController } from "./controllers/User/CreateUserController";

//passar a biblioteca para a constante
const router = Router();

//rota para a criação de novos usuários
router.post('/users', new CreateUserController().handle)


//rotas teste
router.get('/teste', (req: Request, res: Response)=>{
    // get que retorna o json para o caminho
    return res.json({ok: true})
})

router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})
export {router}