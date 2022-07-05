
import { NextFunction, Request, Response } from "express";

// import do jwt, fazer o install e install das tipagens
// instalar o dotenv depois do jtw 
// alterar para "Strict true " no tsconfig.json 


import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

export function estaAutemtificado(
    req: Request,
    res: Response,
    next: NextFunction

){
    //receber o token
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")

    console.log(token)
    
    try {
        //validar token
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad

  //      recuperar o id do token e colocar dentro de uma variavel dentro do request
        req.user_id = sub;

        return next();

    } catch (err) {
        return res.status(401).end
    }

}