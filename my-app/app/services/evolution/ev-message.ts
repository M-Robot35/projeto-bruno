import HttpRequests from "@/app/core/helpers/HttpRequests";
import { Logs } from "@/app/core/logs";
import EvolutionManage from "./ev-menage";
import { eventsEvolution, respondeEvento } from "./ev-eventos/evolutionEventos";
import z from 'zod'

export const sendMessageSchema= z.object({
    apikey: z
        .string({message:"precisa ter a apikey"})
        .trim(), 
    instance: z
        .string({message:"precisa ter a instancia"})
        .trim(), 
    message: z
        .string({message:"precisa ter a message"})
        .trim(), 
    number: z
        .string({message:"precisa ter a number"})
        .trim()
})

interface IMessageOptions {
    delay?: number
    linkPreview?: boolean
    mentionsEveryOne?: boolean
}

type IMessageData= {
    message:string
    apikey:string
    instance:string
    number: string
}

interface ISendPoll {
    selectableCount?: number
    values: string[]
}


export default class EvMessage {
    
    constructor( private data:EvolutionManage ){}

    async sendMessageText(data:IMessageData, options?:IMessageOptions){       
        const verify = sendMessageSchema.safeParse(data)
        
        if(!verify.success){
            const err= verify.error.flatten().fieldErrors
            Logs.error(`[ EXECUTANDO ][ ERROR ] [EV SEND MESSAGE ]= ${err} `, JSON.stringify(err))
            return
        }

        const url= `${this.data.urlCompleta}/message/sendText/${data.instance}`

        const body = {
            number: data.number,
            text: data.message,
            delay: 3000
        }

        if(options?.delay){
            body.delay= options.delay
        }

        try{
            const execute= await HttpRequests.post({
                url,
                body,
                headers:{ apikey: data.apikey  }
            })

            const response= await execute
            eventsEvolution.emit('MESSAGE_TEXT', respondeEvento(true, 'Mensagem enviada com sucesso', { instance: data.instance, number: data.number, message: data.message, ...response}) )
            return response

        }catch(error){
            eventsEvolution.emit('MESSAGE_TEXT', respondeEvento(false, 'Erro ao enviar mensagem', JSON.stringify(error)) )
            return null
        }
    }



    async messagePoll(data:IMessageData, options:ISendPoll){
        
        if(!!Array.isArray(options.values)){
            eventsEvolution.emit('MESSAGE_POLL', respondeEvento(false, 'Value não e um tipo de array', null) )
            Logs.error('messagePoll', 'Value não e um tipo de array')
            return
        }

        if(!data.message || !data.apikey || !data.instance || !data.number){
            Logs.error('messagePoll', 'Falta uma propriedade [number-apikey-instance-message]')
            eventsEvolution.emit('MESSAGE_POLL', respondeEvento(false, 'Falta uma propriedade [number-apikey-instance-message]', null) )
            return
        }
        const url= `${this.data.urlCompleta}/message/sendText/${data.instance}`

        const body = {
            number: data.number,
            selectableCount: 1,
            delay: 1200,
            values: options.values
        }

        if(options?.selectableCount){
            body.selectableCount= options.selectableCount
        }

        try{
            const execute= await HttpRequests.post({
                url,
                body,
                headers:{ apikey: data.apikey }
            })
    
            const response= await execute
            eventsEvolution.emit('MESSAGE_POLL', respondeEvento(true, 'Mensagem enviada com sucesso', { instance: data.instance, number: data.number, message: data.message, ...response}) )
            return response
        }catch(error){
            eventsEvolution.emit('MESSAGE_POLL', respondeEvento(false, 'Erro ao enviar mensagem', error) )
            return null
        }
    }
}

