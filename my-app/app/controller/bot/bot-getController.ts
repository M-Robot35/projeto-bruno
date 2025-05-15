'use server'
import BotModel from "@/app/database/db-model/bot-model"
import { Logs } from "@/app/core/logs"
import z from 'zod'

export type botType=  {
    id: string;
    name: string;
    description?: string;
    instanceId: string;
    status?: "ATIVO"|"PAUSADO"|"DESATIVADO"|"AGENDADO"|"ERRO";
    autoStart?: boolean;
    startTime?: Date;
    stopTime?: Date;
}

const botGetSchema= z.object({
    botId: z.string().trim().min(3),
})

export async function botGetById(botId:string){
    const validate= botGetSchema.safeParse({
        botId
    })

    if(!validate.success){
        Logs.error('botGetById', `bot Não existe ${botId}`)
        return
    }

    if(!botId ){
        Logs.error('botGetById', `Não encontrado alguns parametros ID - ${botId}`)
        return
    }
    const botInstance = new BotModel()
    const execute= await botInstance.findById(botId)
    
    if(!execute) return null
    Logs.success('botGetById','Bot Criado com success')
    return execute
}


export async function botGetByName(BotName:string):Promise<botType>{
    if(!BotName ){
        Logs.error('botGetByName', `Não encontrado alguns parametros NAME - ${BotName}`)
        return
    }

    const botInstance = new BotModel()
    const execute= await botInstance.findByName(BotName)
    if(!execute) return null
    return execute
}
