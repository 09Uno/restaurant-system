import prismaClient from "../../prisma/prisma";

interface FinalizarRequest{
    order_id: string
}

class FinalizarPedidoService{

    async execute({order_id}:FinalizarRequest){

        const pedido = await prismaClient.order.update({
            where:{
                id: order_id
            }, data:{
                status:true
            }
        })

        return pedido
    }

}

export {FinalizarPedidoService}