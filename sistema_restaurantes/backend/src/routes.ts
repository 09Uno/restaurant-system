
//bibioteca de rotas
import { Router, Request, Response } from "express";

//import para manipular imagens
import multer from "multer";

//controler para criação dos users
import { CreateUserController } from "./controllers/User/CreateUserController";

import { AutenticarUserController } from "./controllers/User/AutenticarUserController";

import { DetailUserController } from "./controllers/User/DetailUserController";

import {CreateCategoryController} from "./controllers/Categorias/createCategoryController"

import { ListaCategoriasController } from "./controllers/Categorias/listaCategoriasController";

import { estaAutemtificado } from "./middlewares/estaAutemtificado";

import { CreateProdutosController } from "./controllers/produtos/createProdutosController";

import {ListarProdutoPorCategoria} from './controllers/produtos/listarProdutoPorCategoria'

import { RemoverPedidosController } from './controllers/pedidos/RemoverPedidosController'
//import do upload do arquivo multer.ts
import uploadConfig from './config/multer'

import { CreatePedidosController } from "./controllers/pedidos/CreatePedidosController";
import { AddQuantidadeController } from "./controllers/pedidos/addQuantidadeController";

import { RemoverItemController} from './controllers/pedidos/RemoverItemController'

import {EnviarPedidoController} from './controllers/pedidos/EnviarPedidosController'

import {ListarPedidosController} from './controllers/pedidos/ListarPedidosController'

import { DetalhesPedidosController } from './controllers/pedidos/DetalhesPedidosController'

import { FinalizarPedidoController } from "./controllers/pedidos/FinalizarPedidoController";

const upload = multer(uploadConfig.upload("./temp"))

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

//Rotas de Produto

router.post('/produtos', estaAutemtificado, upload.single('file'), new CreateProdutosController().handle)

router.get('/produtos', estaAutemtificado, new ListarProdutoPorCategoria().handle )


//Rotas de Pedidos

router.post('/pedidos', estaAutemtificado, new CreatePedidosController().handle)
router.delete('/pedidos', estaAutemtificado, new RemoverPedidosController().handle)

router.post('/produtos/add', estaAutemtificado, new AddQuantidadeController().handle)

router.delete('/produtos/remover/item', estaAutemtificado, new RemoverItemController().handle)

router.put('/pedidos/enviar', estaAutemtificado, new EnviarPedidoController().handle)

router.get('/pedidos/listar', estaAutemtificado, new ListarPedidosController().handle)

router.get('/pedidos/detalhes', estaAutemtificado, new DetalhesPedidosController().handle)

router.put('/finalizar/pedidos', estaAutemtificado, new FinalizarPedidoController().handle )

//rotas teste
router.get('/teste', (req: Request, res: Response)=>{
    // get que retorna o json para o caminho
    return res.json({ok: true})
})

router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})
export {router}