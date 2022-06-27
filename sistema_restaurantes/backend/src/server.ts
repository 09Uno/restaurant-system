//primeira coisa a se fazer é configurar o server


//"scripts": {
//  "dev": "ts-node-dev src/server.ts" }, < adcionar no arquivo packge.Json, abaixo de license

//bibliotecas e imports requeridos
import express, {Request, Response, NextFunction} from 'express'

//express para tratativa de erros
import 'express-async-errors'

import cors from 'cors'

//import das rotas
import {router} from './routes'

//passar a biblioteca para a constante
const app = express();

//fazer o uso 
app.use(express.json())
app.use(cors())
app.use(router);


//tratamento de erro 
app.use((erro: Error, req: Request, res: Response, next:NextFunction)=>{

    //se ouver um erro retornar :
    if(erro instanceof Error){
        return res.status(400).json({
            error: erro.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'internal server error'
    })
})



//servidor
app.listen(3333, ()=>{
    console.log("Online")
})