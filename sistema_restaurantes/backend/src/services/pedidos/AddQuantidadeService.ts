import prismaClient from "../../prisma/prisma";

interface QuantidadeRequest{
    order_id: string;
    product_id: string;
    amount: number;
}

class AddQuantidadeService{

    async execute({order_id, product_id, amount}:QuantidadeRequest){

        const pedido = await prismaClient.item.create({
            data:{
                order_id: order_id,
                product_id: product_id,
                amount
            }
        })

        return pedido;  
    }
}

export {AddQuantidadeService}