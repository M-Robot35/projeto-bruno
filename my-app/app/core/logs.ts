import { configSystem } from "./system-config";
import pc from "picocolors"

const rejectShowLogs=['AxiosHttpClient', 'instancia_all']

type OptionsLogsType={
    input?:any
}

// documentação de logs color- https://www.npmjs.com/package/picocolors
export const Logs = {
    success: (local:string, mensagem:any):void=>{
        if(rejectShowLogs.includes(local)) return
        const showMsgLog= typeof mensagem != 'string'? JSON.stringify(mensagem): mensagem
        
        if(configSystem.system.logs.success){  
            console.log(
                pc.bgBlack(
                    pc.green(`[ LOCAL ] =  ${local}            
            [ SUCCESS ] - ${showMsgLog}
            `))
            )
        }
    },    
    
    error: (local:string, mensagem:any):void=>{
        const showMsgLog= typeof mensagem != 'string'?JSON.stringify(mensagem):mensagem
        if(configSystem.system.logs.error){
            console.error(
                pc.bgBlack(
                    pc.red(`[ LOCAL ] = ${local}            
            [ ERROR ] = ${showMsgLog}
            `))
            )
        }
    },
}