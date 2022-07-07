import { Request,Response } from "express";

import {AddQuantidadeService} from '../../services/pedidos/AddQuantidadeService'

class AddQuantidadeController{

    async handle(req: Request, res: Response){

        const {order_id, product_id, amount} = req.body

        const addQuantidadeService = new AddQuantidadeService();

        const pedidos = await addQuantidadeService.execute({
            order_id,
            product_id,
            amount
        })

        return res.json(pedidos);
    }

}

export {AddQuantidadeController}