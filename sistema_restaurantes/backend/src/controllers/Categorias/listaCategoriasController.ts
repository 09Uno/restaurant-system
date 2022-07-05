import { Request, Response } from "express";
import { ListaCategoriasService} from "../../services/categorias/listaCategoriasService"

class ListaCategoriasController{

    async handle(req: Request, res: Response){

        const listaCategoriasController = new ListaCategoriasService();

        const categoria = await listaCategoriasController.execute();

        return res.json(categoria);

    }


}

export {ListaCategoriasController}

