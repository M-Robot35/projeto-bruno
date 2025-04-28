'use server'

import userModel from '../database/db-model/user-model'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getServerAction } from './getSectionAction'


const userFormSchema= z.object({
    name: z.string().min(1, {message: 'Nome inválido'} ).max(255, {message: 'Nome inválido'}),
    email: z.string().email({message: 'Email inválido'}),
    telefone: z.string().min(11, {message: 'Telefone inválido'})
})  

export async function userFormAction(_:any, formData: FormData){
    const verify= userFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        telefone: formData.get('telefone')
    })
    
    if(!verify.success){
        return {
            error: verify.error.flatten().fieldErrors
        }
    }

    const { name, email, telefone }= verify.data
    const us= await getServerAction()

    try{
        await userModel.update(us!.id, {
            name,
            email,
            telefone
        })
        revalidatePath('/admin/user')
        return {
            success: 'Usuário atualizado com sucesso'
        }
    }catch(error){
        return {
            error2: 'Erro ao atualizar usuário'
        }
    }
}