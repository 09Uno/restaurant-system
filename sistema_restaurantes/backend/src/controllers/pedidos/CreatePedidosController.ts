import { Request, Response } from "express";

import {CreatePedidosService} from '../../services/pedidos/CreatePedidosService'

class CreatePedidosController{

    async handle(req: Request, res:Response){

        const {table, name} = req.body

        const createPedidosService = new CreatePedidosService()

        const pedidos = await createPedidosService.execute({
            table,
            name,
        })

        return res.json(pedidos)
    }

}

export {CreatePedidosController}
