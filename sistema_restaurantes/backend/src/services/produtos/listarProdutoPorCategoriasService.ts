import prismaClient from "../../prisma/prisma";

interface RequestProdutos{

    category_id : string
}


class ListarProdutoPorCategoriasService{

    async execute({category_id}: RequestProdutos){

        const listarPorCategoria = await prismaClient.product.findMany({
            where:{
                category_id : category_id
            }
        })

        return listarPorCategoria;
    }

}

export {ListarProdutoPorCategoriasService}