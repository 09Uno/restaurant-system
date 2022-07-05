//Dentro arquivo "tsconfig.json" criar a configuração permitindo a utilização da tipagem
//Dentro da parte "Tyes.root e indicar onde está a pasta que está salva este arquivo"

declare namespace Express{
    export interface Request{
        user_id: string;
    }
}