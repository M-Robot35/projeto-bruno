import EventDefault from "@/app/core/helpers/eventsDefault";
import { ISettings,  } from "../evoluitonTypes/instances-type";
import { InstanceCreateEvolution } from "../evoluitonTypes/instances-type";
import { Logs } from "@/app/core/logs";
//import { deleteInstanceAction, setInstanceStatusConnection } from "@/app/actions/instanceAction";
import {  WebhookConnectionUpdateDTO } from "../ev-webhook/webhook-msg-connection";
import instanciaModel from "@/app/database/db-model/instancia-model";
import { sessionUserAction } from "@/app/actions/getSectionAction";


export function respondeEvento<T=any>(success:boolean ,message:string, data:T){
    if(!success || !message){
        return {
            success:false,
            message:'Evento não pode ser enviado'
        }
    }

    return {
        success,
        message,
        data
    }
}

type typeDataInstance<T=any>= {
    success: boolean,
    message: string,
    data: T 
}

export type TypeEventsName= 
|"SETTINGS" 
|"SETTINGS_UPDATE" 
|"INSTANCIA_CRIAR" 
|"INSTANCIA_CONNECT" 
|"INSTANCIA_ALL" 
|"INSTANCIA_STATUS_CONNECTION" 
|"INSTANCIA_DELETE" 
|"WEBHOOK_UPDATE"
|"WEBHOOK_GET"
|"INSTANCIA_LOGOUT"
|"INSTANCIA_RESTART"
|"PROXY_GET" 
|"PROXY_UPDATE"
|"GROUPS_ALL"
|"GROUPS_BUSCAR_PARTICIPANTS"
|"MESSAGE_TEXT"
|"MESSAGE_POLL"
export const eventsEvolution= new EventDefault<TypeEventsName>()

eventsEvolution.on('INSTANCIA_CRIAR', async ( event:typeDataInstance<InstanceCreateEvolution> )=>{  
    const { success, message, data }= event
    if(!success){
        Logs.error('INSTANCIA_CRIAR', message)
        return
    }
    const {id}= await sessionUserAction()
    const { hash, qrcode, settings, rabbitmq, ...rest }= data

    // salva a instancia do usuario no BD
    const save= await instanciaModel.create({
        userId:id,
        hash:rest.instance.instanceId,
        instanciaName:rest.instance.instanceName,
        numero:'',
        baseCode:'',
        statusConnection:rest.instance.status
    })
})

// deleta a instancia
eventsEvolution.on('INSTANCIA_DELETE', async( event:typeDataInstance<InstanceCreateEvolution> )=>{  
    // deletar a instancia do banco de dados
    const { success, message, data }= event
    if(!success){
        Logs.error('INSTANCIA_DELETE', message)
        return
    }
    const {id}= await sessionUserAction()
    const deleteInstance:any= data
    const { instance }= deleteInstance
    
    try{
        await instanciaModel.delete(id, instance)
    }catch(error){
        Logs.error('INSTANCIA_DELETE', JSON.stringify(error))
    }
})

eventsEvolution.on('WEBHOOK_UPDATE', ( event:typeDataInstance )=>{  
    //  navegador -- resposta do lado do client
    console.log('WEBHOOK_UPDATE evento disparado -- ', event)
    const { success, message, data }= event
    if(!success){
        Logs.error('INSTANCIA_CONNECT', message)
        return
    }
    console.log('WEBHOOK_UPDATE', data) 
})  


eventsEvolution.on('INSTANCIA_STATUS_CONNECTION', async( event:WebhookConnectionUpdateDTO)=>{
    Logs.success('INSTANCIA_STATUS_CONNECTION', `Evento recebido: ${event.instance} - ${event.state}`)
    try{
        if (!event || !event.instance) {
            Logs.error('INSTANCIA_STATUS_CONNECTION', 'Dados do evento inválidos')
            return
        }
       //await setInstanceStatusConnection(event.instance, event.state)   
       Logs.success('INSTANCIA_STATUS_CONNECTION', `Status atualizado: ${event.instance} - ${event.state}`)
     
    }catch(error){
        Logs.error('INSTANCIA_STATUS_CONNECTION', `Erro ao atualizar status: ${error}`)
    }   
})


eventsEvolution.on('SETTINGS_UPDATE', ( event:typeDataInstance<ISettings> )=>{    
    // pode notificar o usuario por whatsapp ou email ao surgir o evento  
    const usuario= event
    console.log('EVENTO ACIONADO -- ', event)
})
