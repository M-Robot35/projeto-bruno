"use server"
import PromptModel, { promptCreateSchema } from "@/app/database/db-model/prompt-model"
import { Logs } from "@/app/core/logs"
import Cache, {schemaCache} from "@/app/actions/cacheActions"

export async function promptDeleteController(promptId:string, args?:any):Promise<{
    success: boolean,
    content: any
}>{
    // deleta do BD
    const prepare= new PromptModel()
    const execute= await prepare.deletePrompt(promptId)
    
    // deleta do CACHE
    const saveCache= new Cache()
    await saveCache.delete(`${schemaCache.prompts}_${args}`)
    
    if(!execute){
        Logs.error('[ promptDeleteController ] === ', JSON.stringify(execute))
        return {
            success: false,
            content: JSON.stringify(execute)
        }
    }
    
    return {
        success: true,
        content: execute
    }
}