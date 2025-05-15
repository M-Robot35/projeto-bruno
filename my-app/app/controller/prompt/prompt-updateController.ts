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

type UpdateType= Partial<Omit<Prompt,'id'|'createdAt'|'updatedAt'>>

export async function promptUpdateController(promptId:string, data:UpdateType, args?:any){   
    try{
        const prepare= new PromptModel()
        prepare.update(promptId, data)

        const saveCache= new Cache()
        await saveCache.delete(`${schemaCache.prompts}_${args}`)
    }catch(err){
        Logs.error(`[ EXECUTE ][ PROMPT UPDATE] === `,JSON.stringify({promptId,data}))
        const saveCache= new Cache()
        await saveCache.delete(`${schemaCache.prompts}_${args}`)
    }
}