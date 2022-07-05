
//bibioteca de rotas
import { Router, Request, Response } from "express";

//controler para criação dos users
import { CreateUserController } from "./controllers/User/CreateUserController";

import { AutenticarUserController } from "./controllers/User/AutenticarUserController";

import { DetailUserController } from "./controllers/User/DetailUserController";

import {CreateCategoryController} from "./controllers/Categorias/createCategoryController"

import { ListaCategoriasController } from "./controllers/Categorias/listaCategoriasController";

import { estaAutemtificado } from "./middlewares/estaAutemtificado";

//passar a biblioteca para a constante
const router = Router();

//rota para a criação de novos usuários
router.post('/users', new CreateUserController().handle)
router.post('/autenticar', new AutenticarUserController().handle)

// rota com midwaere, apenas para liberar usuários autentificados
router.get('/me', estaAutemtificado, new DetailUserController().handle)

//Rotas de categorias
router.post('/categoria',estaAutemtificado, new CreateCategoryController().handle )

router.get('/categoria', estaAutemtificado, new ListaCategoriasController().handle)








//rotas teste
router.get('/teste', (req: Request, res: Response)=>{
    // get que retorna o json para o caminho
    return res.json({ok: true})
})

router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})
export {router}