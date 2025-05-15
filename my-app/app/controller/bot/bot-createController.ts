'use server'
import BotModel from "@/app/database/db-model/bot-model"
import { Logs } from "@/app/core/logs"
import z from 'zod'

const botCreateSchema= z.object({
    instanceId: z.string().trim().min(3),
    InstanceName: z.string().trim().min(3)
})

export async function botCreate(instanceId:string, InstanceName:string ){
    const validate= botCreateSchema.safeParse({
        instanceId,
        InstanceName
    })
    if(!validate.success){
        Logs.error('botCreate', `Não encontrado alguns parametros ID - ${instanceId} ou NAME- ${InstanceName}`)
        return
    }

    const botInstance = new BotModel()
    const execute= await botInstance.create({
        instanceId,
        name: InstanceName
    })
    
    if(!execute) return null
    Logs.success('botCreate','Bot Criado com success')
    return execute
}
