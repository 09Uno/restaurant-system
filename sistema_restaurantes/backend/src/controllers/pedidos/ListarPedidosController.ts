import { Request, Response } from "express";

import {ListarPedidosService} from '../../services/pedidos/ListarPedidosService'

class ListarPedidosController{

    async handle(req: Request, res: Response){
        const listarPedidosService = new ListarPedidosService()

        const pedidos = await listarPedidosService.execute()
        return res.json(pedidos)
    }

}

export {ListarPedidosController}