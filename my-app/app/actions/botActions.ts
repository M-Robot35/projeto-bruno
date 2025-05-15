"use server"
import { sessionUserAction } from "./getSectionAction"
import { botGetById, botGetByName } from "../controller/bot/bot-getController"
import { botUpdate } from "../controller/bot/bot-updateController"
import { botType } from "../controller/bot/bot-getController"


export async function botUpdateAction(botId:string, data:Partial<botType>){
    if(!botId){
        return null
    }

    if(data['id']) delete data.id

    const { id, email, role, name} = await sessionUserAction()
    const execute= botUpdate(botId, data)
    return execute
}

export async function botGetByIdAction(botId:string){
    if(!botId){
        return null
    }
    
    const { id, email, role, name} = await sessionUserAction()
    
    const execute= botGetById(botId)
    return execute    
}

export async function botGetByNameAction(instanceName:string){
    if(!instanceName){
        return null
    }
    const { id, email, role, name} = await sessionUserAction()
    const execute= botGetByName(instanceName)
    return execute    
}