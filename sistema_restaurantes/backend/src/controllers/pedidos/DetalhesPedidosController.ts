import { Request, Response } from "express";
import {DetalhesPedidosService} from '../../services/pedidos/DetalhesPedidosService'

class DetalhesPedidosController{

    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string

        const detalhesPedidosService = new DetalhesPedidosService()

        const detalhes = await detalhesPedidosService.execute({
            order_id
        })

        return res.json(detalhes)
    }

}

export {DetalhesPedidosController}