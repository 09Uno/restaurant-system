import prismaClient from "../../prisma/prisma";

interface ItemRequest{

    item_id: string

}


class RemoverItemService{

    async execute({item_id}:ItemRequest){

        const pedido = await prismaClient.item.delete({
            where:{
                id : item_id
            }
        })

        return pedido;
    }

}

export {RemoverItemService}