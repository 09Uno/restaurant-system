import { Request, Response } from "express";

import {RemoverPedidosService} from '../../services/pedidos/RemoverPedidosService'

class RemoverPedidosController{

    async handle(req:Request, res:Response){
        const order_id = req.query.order_id as string

        const removerPedido = new RemoverPedidosService();


        const pedido = await removerPedido.execute({
            order_id,
        })

        return res.json(pedido)
    }


}

export {RemoverPedidosController}