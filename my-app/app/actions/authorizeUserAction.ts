'use server'
import z from 'zod'
import bcriptHash from '../core/helpers/bcript'
import userModel,{user} from '../database/db-model/user-model'


const signInSchema = z.object({
    email: z.string({ required_error: "Por favor, informe seu e-mail." })
      .min(1, "Por favor, informe seu e-mail.")
      .email("O e-mail informado não é válido."),
  
    password: z.string({ required_error: "Por favor, informe sua senha." })
      .min(1, "Por favor, informe sua senha.")
      .min(8, "A senha deve conter no mínimo 8 caracteres.")
      .max(32, "A senha deve conter no máximo 32 caracteres.")
});

type TypeAuthorizeUser={
    email:string
    password: string
}

export default async function AuthorizeUser(userData: TypeAuthorizeUser):Promise<user|null> {
    const {email, password}= userData

    try{
        const getUser= await userModel.findByEmail(email)    
        if (!getUser) return null

        const pwHash = await bcriptHash.compare(password, getUser.password)
        
        if (!pwHash ) return null

        return getUser
    }catch(error){
        return null
    }
}