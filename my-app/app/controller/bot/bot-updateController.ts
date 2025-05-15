'use server'
import BotModel,{ BotCreateType } from "@/app/database/db-model/bot-model"
import { botType } from "./bot-getController"
import { Logs } from "@/app/core/logs"
import z from 'zod'

const botUpdateSchema= z.object({
    name: z.string().trim().optional(),
    instanceId: z.string().trim().optional(),
    description: z.string().trim().optional(),
    status: z.enum([
        "ATIVO" , "PAUSADO" , "DESATIVADO" , "AGENDADO" , "ERRO"
    ]).optional(),
    autoStart: z.boolean().optional()
})


export async function botUpdate(instance:string, data: Partial<BotCreateType>){
    const validate= botUpdateSchema.safeParse({...data})
    
    if(!validate.success){
        console.log(JSON.stringify(data))
        const err= JSON.stringify(validate.error.flatten().fieldErrors )
        Logs.error('botUpdate', `Error no Botupdate ID ${instance} == ${err}`)
        return
    }

    const botInstance = new BotModel()
    const buscaBot= await botInstance.findById(instance)
    
    if(!buscaBot){
        Logs.error('botUpdate', `Não foi encontrado a Instancia com nome ${instance}`)
        return false
    }
    
    const execute= await botInstance.update(buscaBot.id, data)
    Logs.success('botUpdate','Bot Criado com success')
    return true
}