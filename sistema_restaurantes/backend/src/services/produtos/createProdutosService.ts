import prismaClient from "../../prisma/prisma";

interface ProdutosRequest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;

}


class CreateProdutosService{

    async execute({name,price, description, banner, category_id}:ProdutosRequest){


        const produto = await prismaClient.product.create({
            data:{
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
            }
        })


        return produto
    }


}

export {CreateProdutosService}