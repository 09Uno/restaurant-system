import {Request, Response} from "express"
import {CreateCategoryService} from "../../services/categorias/createCategoryService"

class CreateCategoryController{

    async handle(req: Request, res: Response){

        const { name } = req.body;

        const createCategoryService = new CreateCategoryService();

        const categoria = await createCategoryService.execute({
            name,
        })

        return res.json(categoria);
    }


}
export {CreateCategoryController}

