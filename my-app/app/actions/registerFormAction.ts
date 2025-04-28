'use server'
import z from 'zod'
import userModel from '../database/db-model/user-model'
import bcriptHash from '../core/helpers/bcript'

const signInSchema = z.object({
    email: z.string({ required_error: "Por favor, informe seu e-mail." })
      .min(1, "Por favor, informe seu e-mail.")
      .email("O e-mail informado não é válido."),
  
    password: z.string({ required_error: "Por favor, informe sua senha." })
      .min(1, "Por favor, informe sua senha.")
      .min(8, "A senha deve conter no mínimo 8 caracteres.")
      .max(32, "A senha deve conter no máximo 32 caracteres."),
  
    confirmPassword: z.string({ required_error: "Por favor, confirme sua senha." })
      .min(1, "Por favor, confirme sua senha.")
      .min(8, "A confirmação deve conter no mínimo 8 caracteres.")
      .max(32, "A confirmação deve conter no máximo 32 caracteres."),
});
  



export default async function RegisterFormAction(_:any,formdata:FormData){    
    const verifyUserDb= signInSchema.safeParse({
        email: formdata.get('email'),
        password: formdata.get('password'),
        confirmPassword: formdata.get('confirmPassword'),
    })

    if(!verifyUserDb.success){
        return {
            error: verifyUserDb.error.flatten().fieldErrors
        }
    }
    const {password, confirmPassword, email}= verifyUserDb.data

    if(password != confirmPassword){
        return {
            warning: 'Login ou password inválidos'
        }
    }
    const verifyUserExistis= await userModel.findByEmail(email)

    if(verifyUserExistis){        
        return {
            warning:'Login ou password inválidos'
        }
    }
    const passHash= await bcriptHash.passHash(password)
    const saveUserDb= await userModel.create({
        email,
        password:passHash
    })
    
    if(!saveUserDb){
        return {
            warning: 'Login ou password inválidos'
        }
    }
    return {success: 'Usuário Registrado com Sucesso'}    
}


