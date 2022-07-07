import { Request, Response  } from "express";

import {RemoverItemService} from '../../services/pedidos/RemoverItemService'

class RemoverItemController{

    async handle(req: Request, res:Response){

        const item_id = req.query.item_id as string

        const removerItemService = new RemoverItemService();

        const pedido = await removerItemService.execute({
            item_id
        })
        
        return res.json(pedido)
    }

}

export {RemoverItemController}