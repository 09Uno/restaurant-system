import prismaClient from "../../prisma/prisma";

class ListaCategoriasService{

    async execute(){

    const categorias = prismaClient.category.findMany({
        select:{
            id: true,
            name: true,
        }
    })

        return categorias;
    }

}

export {ListaCategoriasService}