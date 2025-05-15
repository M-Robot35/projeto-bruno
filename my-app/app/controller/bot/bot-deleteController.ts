'use server'
import BotModel from "@/app/database/db-model/bot-model"
import { Logs } from "@/app/core/logs"
import { botGetByName } from "./bot-getController"
import z from 'zod'

const botDeleteSchema= z.object({
    instance: z.string().trim().min(3),
})

export async function botDelete(instance:string){
    const validate= botDeleteSchema.safeParse({
        instance
    })

    if(!validate.success){
        Logs.error('botDelete', `bot Não existe ${instance}`)
        return
    }
    const botExistis= await botGetByName(instance)

    if(!botExistis){
        Logs.error('botDelete', `bot Não existe ${instance}`)
        return false
    } 
        
    const botInstance = new BotModel()
    const buscaBot= await botInstance.findByName(instance)
    
    if(!buscaBot){
        Logs.error('botDelete', `Não foi encontrado a Instancia com nome ${instance}`)
        return false
    }
    
    const execute= await botInstance.delete(buscaBot.id)
    Logs.success('botCreate','Bot Criado com success')
    return true
}