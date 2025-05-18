import WhatsappMessage from "../evolution";
import { sendMessageSchema } from "../ev-message";
import { Logs } from "@/app/core/logs";


function dividirMensagemPorPalavras(texto:string, limite:number = 1000): string[] {
    const palavras = texto.split(' ');
    const partes = [];
    let parteAtual = '';
  
    for (const palavra of palavras) {
      // Se adicionar essa palavra ultrapassa o limite...
      if ((parteAtual + ' ' + palavra).trim().length > limite) {
        partes.push(parteAtual.trim());
        parteAtual = palavra;
      } else {
        parteAtual += ' ' + palavra;
      }
    }
  
    // Adiciona a última parte se ainda restar conteúdo
    if (parteAtual.trim().length > 0) {
      partes.push(parteAtual.trim());
    }
  
    return partes;
}

type sendMsgOptionsType={
    tempoEsperaMensagem?:number,
    enviarMsgCharacteres?:number
}

type dataMsg= {
    apikey: string,
    instance: string,
    message: string,
    number: string
}


// ENVIA MENSAGEM DE TEXTO PARA USUARIO/OU GRUPO
export async function sendMessageText(data:dataMsg, options?:sendMsgOptionsType):Promise<void>{
    const tempoEsperaMensagem:number=3      // segundo entre mensagens
    const enviarMsgCharacteres:number=1000  // cortar as mensagens em partes apartir de tantos caracteres, ideal 1000 ou 2000 para não ficar muito pequeno
    const verify = sendMessageSchema.safeParse(data)    
    
    if(!verify.success){
        const err= verify.error.flatten().fieldErrors
        Logs.error(`[ EXECUTANDO ][ ERROR ]= ${err} `, err)
        return
    }
    
    const {apikey, instance, message, number}=verify.data
    
    try{
        if(message && message.trim().length > enviarMsgCharacteres){
            const partes = dividirMensagemPorPalavras(message);
            for (const parte of partes) {
                await WhatsappMessage.messagem.sendMessageText({
                    apikey,
                    instance,
                    message: parte,
                    number
                });
                await new Promise(resolve => setTimeout(resolve, ( tempoEsperaMensagem* 1000))); 
            }
            return
        }
        
        await WhatsappMessage.messagem.sendMessageText({
            apikey,
            instance,
            message, 
            number
        });

    }catch(e){
        console.log(`[ EXECUTANDO ][ ERROR ][ LOG ]= `, {
            apikey,
            instance,
            message,
            number
        })
        
        Logs.error(`[ EXECUTANDO MSG ][ ERROR ][ sendMessageText ]= mensagem não enviada`, {
            apikey,
            instance,
            message,
            number
        })
    }
}