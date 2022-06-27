

interface UseRequest{
    name:string;
    email:string;
    password:string;
}

class CreateUserService{
    async execute({name, email, password}: UseRequest){
        return{ok: true}
    }
}

export {CreateUserService}