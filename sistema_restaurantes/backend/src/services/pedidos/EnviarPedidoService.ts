import prismaClient from "../../prisma/prisma";

interface PedidoRequest{
    order_id: string
}

class EnviarPedidoService{

    async execute({order_id}: PedidoRequest){


        const pedido = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{
                draft : false
            }
        })

        return pedido
    }

}

export {EnviarPedidoService}