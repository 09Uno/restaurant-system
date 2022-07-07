import prismaClient from "../../prisma/prisma";

interface PedidosRequest{
    order_id: string,
}

class DetalhesPedidosService{

    async execute({order_id}:PedidosRequest){

        const pedidos = await prismaClient.item.findMany({
            where:{
                order_id : order_id
            },
            include:{
                product:true,
                order: true
            }
        })

        return pedidos;
    }

}

export {DetalhesPedidosService}