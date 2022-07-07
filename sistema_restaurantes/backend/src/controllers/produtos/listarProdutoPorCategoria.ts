import { Request, Response } from "express";
import {ListarProdutoPorCategoriasService} from '../../services/produtos/listarProdutoPorCategoriasService'

class ListarProdutoPorCategoria{

    async handle(req:Request, res:Response){

        const category_id = req.query.category_id as string;

        const listarProdutoPorCategoriasService = new ListarProdutoPorCategoriasService();

        const listarPorCategoria =  await listarProdutoPorCategoriasService.execute({
            category_id
        });

        return res.json(listarPorCategoria);
    }

}

export {ListarProdutoPorCategoria}