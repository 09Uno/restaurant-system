import { Request, Response } from "express"; 
import {CreateProdutosService} from "../../services/produtos/createProdutosService"

class CreateProdutosController{

    async handle(req:Request, res:Response){

        const {name, price, description, category_id} = req.body

        

        const createProdutosService = new CreateProdutosService();


        if(!req.file){

            throw new Error("Erro de Upload")

        }else{

            const {originalname, filename: banner} = req.file

            const produtos = await createProdutosService.execute({
                name,
                price,
                description,
                banner,
                category_id
            });
            
            return res.json(produtos)
        }


      

       

    }


}

export {CreateProdutosController}