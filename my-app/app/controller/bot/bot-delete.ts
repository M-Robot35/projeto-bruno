'use server'
import BotModel from "@/app/database/db-model/bot-model"
import { Logs } from "@/app/core/logs"
import { botGetByName } from "./bot-get"

export async function botDelete(instance:string){
    const botExistis= await botGetByName(instance)

    if(!botExistis){
        Logs.error('botDelete', `bot Não existe ${instance}`)
        return false
    } 

    if(!instance || !botExistis){
        Logs.error('botDelete', `falta parametro ${instance}`)
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