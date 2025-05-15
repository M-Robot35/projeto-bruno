import { Logs } from "@/app/core/logs";
import { botGetByName, botType } from "@/app/controller/bot/bot-getController";
import { promptGetController, PromptType } from "@/app/controller/prompt/prompt-getController";
import { sendMessageText } from "../ev-componentes/sendMessageText";


export class WebhookMsgUpsertDTO{
    public instance:string|null = null;
    public fromMe:boolean|null = null;
    public id:string|null = null;
    public remoteJid:string|null = null;
    public pushName:string|null = null;
    public message:string|null = null;
    public messageType:string|null = null;
    public messageTimestamp:number|null = null;
    public instanceId:string|null = null;
    public source:string|null = null;
    public destination:string|null = null;
    public date_time:string|null = null;
    public sender:string|null = null;
    public server_url:string|null = null;
    public apikey:string|null = null;    
    public event:string|null = null;

    constructor(private readonly data: WebhookUpsert){
        if(!data.instance){
            throw new Error('Instance is required')
        }

        this.instance = data.instance
        this.fromMe = data.data.key.fromMe
        this.id = data.data.key.id
        this.remoteJid = data.data.key.remoteJid
        this.pushName = data.data.pushName
        this.message = data.data.message.conversation
        this.messageType = data.data.messageType
        this.messageTimestamp = data.data.messageTimestamp
        this.instanceId = data.data.instanceId
        this.source = data.data.source
        this.destination = data.destination
        this.date_time = data.date_time
        this.sender = data.sender
        this.server_url = data.server_url
        this.apikey = data.apikey
        this.event = data.event
    }    
}

export type WebhookUpsert = {
    event: "messages.upsert";
    instance: string;
    
    data: {
      key: {
        remoteJid: string;
        fromMe: boolean;
        id: string;
      };
      
      pushName: string;
      
      message: {
        conversation: string;
        messageContextInfo: Record<string, any>; // Ajuste conforme necessário
      };
      
      messageType: string;
      messageTimestamp: number;
      instanceId: string;
      source: string;
    };
    
    destination: string;
    date_time: string;
    sender: string;
    server_url: string;
    apikey: string;
};

// 5 minutos
const PAUSE_DURATION = 5 * 60 * 1000;

export class WebhookMsgUpsert extends WebhookMsgUpsertDTO {
    // MENSAGENS DE TEXTO
    msgUsuario:boolean=false      // enviar mensagem para somente usuarios
    msgUgrupo:boolean=false      // enviar mensagem somente para grupo    
    // BOT
    protected bot:botType|null= null
    protected prompt:PromptType[]|null= null

  constructor(data: any) {
    if (data.event !== "messages.upsert") {
      throw new Error("Event is required");
    }
    super(data);

  }

  async execute() {
    try {
      const now = Date.now();
      await this.verifyBotStatus();

      if (this.fromMe) return;

      if(this.bot && this.bot.status === 'ATIVO'){
        `pegar o prompt
        jogar dentro da open ai
        devolver a resposta para o usuario
        
        `
        if(this.prompt.length > 0){
            for(let i=0; i <  this.prompt.length; i++){
                console.log(this.prompt[i].content + "\n\n")
                this.prompt[i].content + "\n\n"
            }
        }

      }

      // Atualizar tempo de resposta do usuário
    //   await userMessageStatusModel.updateMessageStatus(this.instance, { timeToAnswer: now.getTime() });

    //   const userMessageStatus = await userMessageStatusModel.findByUserAndInstance(user.id, this.instance);
    //   if (userMessageStatus?.isBlocked) {
    //     Logs.error("WebhookMsgUpsert", `Bot bloqueado para o usuário ${this.apikey} - ${this.remoteJid}`);
    //     return;
    //   }

    //   if (now.getTime() - userMessageStatus.timeToAnswer < PAUSE_DURATION) {
    //     Logs.success("WebhookMsgUpsert", `Aguardando tempo limite do bot para ${user.id}`);
    //     return;
    //   }

    //   const botStatus = await botMessageModel.findByUserInstance(user.id, this.instance);
    //   if (!botStatus?.isActive) {
    //     Logs.error("WebhookMsgUpsert", `Bot inativo para ${this.apikey} - ${this.remoteJid}`);
    //     return;
    //   }

      // Verifica se a mensagem existe e é do tipo texto
      if (!this.fromMe && this.message && this.messageType === "conversation") {
        const usergroup= this.remoteJid.split('@')[1]
        
        // mensagem somente para usuarios
        if(this.msgUsuario && usergroup.startsWith('s')){
            await sendMessageText({
                apikey: this.apikey,
                instance: this.instance,
                message: 'ok', // MENSAGEM A SER ENVIADA PARA O USUARIO
                number: this.remoteJid
            })
            return
        }

        // mensagem somente para grupos
        if(this.msgUgrupo && usergroup.startsWith('g')){
            await sendMessageText({
                apikey: this.apikey,
                instance: this.instance,
                message: 'ok 2', // MENSAGEM A SER ENVIADA PARA O USUARIO
                number: this.remoteJid
            })
            return
        }

        // mensagem quando o usuario não especificar
        if(!this.msgUgrupo && !this.msgUsuario){
            await sendMessageText({
                apikey: this.apikey,
                instance: this.instance,
                message: 'ok 3', // MENSAGEM A SER ENVIADA PARA O USUARIO
                number: this.remoteJid
            })
            return
        }

      } else {
        Logs.error("WebhookMsgUpsert", `Mensagem inválida recebida de ${this.remoteJid}`);
      }
    } catch (error) {
      Logs.error("WebhookMsgUpsert", `[ ERROR CATCHE ] ${error}`);
    }
  }  

  private async verifyBotStatus() {
    try{
        const bot = await botGetByName(this.instance);
        if(!bot) return        
        const promptBot = await promptGetController(bot.id); 

        this.bot=bot
        this.prompt=promptBot
    }catch(e){
        Logs.error("verifyBotStatus", `[ ERROR CATCHE ] ${JSON.stringify(e)}`);
    }
  }
}
