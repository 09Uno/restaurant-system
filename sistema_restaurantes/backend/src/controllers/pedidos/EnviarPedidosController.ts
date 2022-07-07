import { Request, Response } from "express"

import { EnviarPedidoService} from "../../services/pedidos/EnviarPedidoService"

class EnviarPedidoController {
    async handle(req:Request, res:Response){
        
        const{order_id} = req.body

        const enviarPedidoService = new EnviarPedidoService()

        const enviarPedido = await enviarPedidoService.execute({
            order_id
        })

        return res.json(enviarPedido)
    }
}

export {EnviarPedidoController}