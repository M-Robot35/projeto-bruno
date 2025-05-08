'use server'
import BotModel,{BotCreateType} from "@/app/database/db-model/bot-model"
import { Logs } from "@/app/core/logs"

export async function botDelete(instance:string, data: Partial<BotCreateType>){
    const botInstance = new BotModel()
    const buscaBot= await botInstance.findByName(instance)
    
    if(!buscaBot){
        Logs.error('botDelete', `Não foi encontrado a Instancia com nome ${instance}`)
        return false
    }
    
    const execute= await botInstance.update(buscaBot.id, data)
    Logs.success('botCreate','Bot Criado com success')
    return true
}