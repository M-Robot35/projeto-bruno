'use server'
import WhatsappMessage from "../services/evolution/ev-evolution"
import { sessionUserAction } from "./getSectionAction"
import { IEvolutionInstance,InstanceCreateEvolution } from "../services/evolution/evoluitonTypes/instances-type"
import { TypeGroupOutput } from "../services/evolution/evoluitonTypes/instances-type"
import instanciaModel from "../database/db-model/instancia-model"
import { Logs } from "../core/logs"
import z from 'zod'

// se connectar ao uma instancia
export async function whatsappAllInstance():Promise<IEvolutionInstance[]>{
    const {id,email,role,name} = await sessionUserAction()
    const instancias= await WhatsappMessage.instancia.instancia_all()
    if(!instancias) return []
    return instancias   
}

// pega somente as instancias do usuario logado
export async function whatsappInstanceByUser():Promise<IEvolutionInstance[]>{
    const {id,email,role,name} = await sessionUserAction()
    
    const instancias= await WhatsappMessage.instancia.instancia_all()
    if(!instancias) return []

    // pega as instancias somente do usuario
    const instanceUser= await (await instanciaModel.findAllUser(id)).map(instanceId => instanceId.hash)    

    // filtra somente as instancias que o usuario criou
    return instancias.filter(ins => instanceUser.includes(ins.id))  
}


// se pega uma instancia pelo ID
export async function whatsappInstanceByID(instanceId:string):Promise<IEvolutionInstance|null>{
    const {id,email,role,name} = await sessionUserAction()
    
    const instancias= await WhatsappMessage.instancia.instancia_all()    
    if(!instancias) return null

    const instaceById= instancias.find(instance => instance.id == instanceId)    
    if(!instaceById) return null

    return instaceById   
}

// criar uma instancia
export async function whatsappCreateInstance(instanceName:string){
    const {id,email,role,name} = await sessionUserAction()
    const execute= WhatsappMessage.instancia.instancia_criar(instanceName, {
        integration:'WHATSAPP-BAILEYS',
        qrcode:true
    })
    return execute   
}

// criar uma instancia
export async function FormWhatsappCreateInstance(_:any,formdata:FormData): Promise<InstanceCreateEvolution | null>{
    const {id,email,role,name} = await sessionUserAction()
    const schema= z.object({
        name: z.string()
    })

    const instance= schema.safeParse({name: formdata.get('instancia')})    
    if(!instance.success) return null
    
    const execute= WhatsappMessage.instancia.instancia_criar(instance.data.name)
    return execute   
}

// pegar todos os grupos
export async function whatsappMeusGrupos(instanceName: string, apikey: string):Promise<TypeGroupOutput[]>{
    const {id,email,role,name} = await sessionUserAction()
    const execute= await WhatsappMessage.grupos.groupsAll(instanceName, apikey)
    if(!execute) return []
    return execute
}

// deleta uma instancia
export async function whatsappDelete(_:any,instancia:string){
    const {id,email,role,name} = await sessionUserAction()
    if(!instancia){
        Logs.error('whatsappDelete', `Não foi passado o parametro [ instanciaName - ${instancia}]`)
        return false
    }
    
    try{        
        const execute2= await WhatsappMessage.instancia.instancia_delete(instancia)
        return true
    }catch(error){
        return false
    }
}

// desloga uma instancia
export async function whatsappLogout(_:any,instancia:string){
    const {id,email,role,name} = await sessionUserAction()
    try{
        const execute= await WhatsappMessage.instancia.instancia_logout(instancia)
        return true
    }catch(error){
        return false
    }
}

type erroType={"error":true,"message":string}
type successType= {"instance":{"instanceName":string,"state":"open"}}

// desloga uma instancia
export async function whatsappStatus(instancia:string):Promise<erroType|successType>{
    const {id,email,role,name} = await sessionUserAction()
    const execute= await WhatsappMessage.instancia.instancia_reestart(instancia)

    if(execute['error']){        
        return {"error":true,"message": `[object Object]`}
    }
    return {"instance":{"instanceName":`${instancia}`,"state":"open"}}
}


export type restartType={
    pairingCode: 'string' | undefined| null
    code: string,
    base64:string,
    count: number
}

// gera um novo QrCode para uma instancia Desconectada
export async function whatsappRestart(_:any,instancia:string):Promise<restartType | null>{
    const {id,email,role,name} = await sessionUserAction()
    const execute= await WhatsappMessage.instancia.instancia_reestart(instancia)
    console.log(execute)
    
    if(execute && execute['base64']){
        return {
            pairingCode: execute?.pairingCode as any,
            code: execute?.code as any,
            base64:execute?.base64 as any,
            count: execute?.count as any
        }
    }
    return null
    // {"instance":{"instanceName":"Teles","state":"open"}} 
    // {"error":true,"message":"[object Object]"}     
}