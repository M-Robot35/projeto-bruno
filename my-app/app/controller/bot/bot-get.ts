'use server'
import BotModel from "@/app/database/db-model/bot-model"
import { Logs } from "@/app/core/logs"

export async function botGetById(botId:string){
    if(!botId ){
        Logs.error('botGetById', `Não encontrado alguns parametros ID - ${botId}`)
        return
    }
    const botInstance = new BotModel()
    const execute= botInstance.findById(botId)
    if(!execute) return null
    Logs.success('botGetById','Bot Criado com success')
    return execute
}


export async function botGetByName(BotName:string){
    if(!BotName ){
        Logs.error('botGetByName', `Não encontrado alguns parametros NAME - ${BotName}`)
        return
    }
    
    const botInstance = new BotModel()
    const execute= botInstance.findByName(BotName)
    
    if(!execute) return null
    Logs.success('botGetByName','Bot Criado com success')
    return execute
}
