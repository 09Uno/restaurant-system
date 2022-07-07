import prismaClient from "../../prisma/prisma";

class ListarPedidosService{

    async execute(){
            const pedidos = prismaClient.order.findMany({
                where:{
                    draft : false,
                    status: false,
                },
                orderBy:{
                    created_at: 'desc'
                }
            })

        return pedidos;
    }

}

export {ListarPedidosService}