'use server'
import BotModel from "@/app/database/db-model/bot-model"
import { Logs } from "@/app/core/logs"

export async function botCreate(instanceId:string, InstanceName:string ){
    if(!instanceId ||
        instanceId.length < 3 ||
        InstanceName||
        InstanceName.length < 3
    ){
        Logs.error('botCreate', `Não encontrado alguns parametros ID - ${instanceId} ou NAME- ${InstanceName}`)
        return
    }
    const botInstance = new BotModel()
    const execute= botInstance.create({
        instanceId,
        name: InstanceName
    })
    if(!execute) return null
    Logs.success('botCreate','Bot Criado com success')
    return execute
}
