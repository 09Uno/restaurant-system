import prismaClient from "../../prisma/prisma";

interface RemoverRequest{
    order_id: string
}


class RemoverPedidosService{

    async execute({order_id}:RemoverRequest){

        const pedido = await prismaClient.order.delete({
            where:{
                id: order_id
            }
        })

        return pedido;
    }

    
}

export {RemoverPedidosService}