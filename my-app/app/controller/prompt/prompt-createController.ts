"use server"
import PromptModel, { promptCreateSchema } from "@/app/database/db-model/prompt-model"
import { Logs } from "@/app/core/logs"
import Cache,{schemaCache} from "@/app/actions/cacheActions"


export async function promptCreateController(_:any, data:FormData, args?:any):Promise<{
    success: boolean,
    content: any
}>{
    
    const validate= promptCreateSchema.safeParse({
        botId: data.get("botId"),
        title: data.get("title")
    })
    
    if(!validate.success){
        Logs.error('promptCreate', ` [ INPUT ] === ${JSON.stringify(data)}`)
        Logs.error('[ promptCreate ] === ', JSON.stringify(validate.error.flatten().fieldErrors))
        return {
            success: false,
            content: validate.error.flatten().fieldErrors
        }
    }

    const {botId,content,isActive,title}= validate.data
    
    const prepare= new PromptModel()    
    const execute= await prepare.create({
        title,
        botId,
    })
    
    if(!execute){
        Logs.error('promptCreate', `Não foi criado o Prompt == [ INPUT ]= ${JSON.stringify(data)}`)
        return
    }

    // deleta do CACHE
    const saveCache= new Cache()
    await saveCache.delete(`${schemaCache.prompts}_${botId}`)
    
    return {
        success: true,
        content: execute
    }
}