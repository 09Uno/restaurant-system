import prismaClient from "../../prisma/prisma";

interface PedidosRequest{
    table: number;
    name: string;

}

class CreatePedidosService{

    async execute({table, name}:PedidosRequest){

        const pedidios = await prismaClient.order.create({
            data:{
                table:table,
                name: name,
            }
        })

        return pedidios;

    }

}

export {CreatePedidosService}