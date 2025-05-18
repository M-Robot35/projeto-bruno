"use server"
import PromptModel from "@/app/database/db-model/prompt-model"
import { Prompt } from "@prisma/client"
import { Logs } from "@/app/core/logs"
import Cache,{schemaCache} from "@/app/actions/cacheActions"

export type PromptType= {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    isActive: boolean;
    content: string;
    botId: string;
}


export async function promptGetController(botId:string, args?:any):Promise<Prompt[]>{ 
    `
        cache esta dando alguns erros em algumas partes, por isso está desativado,
        consertar e reativar para melhor performace do sistema
    `    
    
    const prepare= new PromptModel()
    const execute= await prepare.findAllUser(botId)
    return execute
    try{
        const saveCache= new Cache()
        const execute= await saveCache.getOrSet(`${schemaCache.prompts}_${botId}`, async ()=> await prepare.findAllUser(botId))    

        if(!execute || !Array.isArray(execute)){
            Logs.error('promptGetController', `Não foi criado o Prompt == [ INPUT ]= ${execute}`)
            return []
        }

        return execute

    }catch(e){
        const execute= await prepare.findAllUser(botId)
        Logs.error('promptGetController', `[ EXECUTANDO ][ CATCH ] ${execute}`)
        return execute
    }
}