import { Request, Response } from "express";

import {FinalizarPedidoService} from '../..//services/pedidos/FinalizarPedidoService'

class FinalizarPedidoController{

    async handle(req: Request, res: Response){
        const {order_id} = req.body;

        const finalizarPedidoService = new FinalizarPedidoService()

        const finalizar =  finalizarPedidoService.execute({
            order_id
        })

        return res.json(finalizar)
    }

}

export {FinalizarPedidoController}