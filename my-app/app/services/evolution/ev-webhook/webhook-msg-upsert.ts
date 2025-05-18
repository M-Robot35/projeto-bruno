import { Logs } from "@/app/core/logs";
import { botGetByName, botType } from "@/app/controller/bot/bot-getController";
import { promptGetController, PromptType } from "@/app/controller/prompt/prompt-getController";
import { sendMessageText } from "../ev-componentes/sendMessageText";
import { buffReceberMensagem } from "../ev-componentes/bufferMessage";

export class WebhookMsgUpsertMap{
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


export class WebhookMsgUpsert extends WebhookMsgUpsertMap {

  // MENSAGENS DE TEXTO
  msgUsuario:boolean=false      // enviar mensagem somente para usuarios
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
      let responseMsg:string=''

      if (this.fromMe) return;

      if(this.bot && this.bot.status === 'ATIVO'){
        const result = await this.aiMessageCreate()
        responseMsg = result
      }else{
        return
      }

      // Verifica se a mensagem existe e é do tipo texto
      if (!this.fromMe && this.message && this.messageType === "conversation") {
        const usergroup= this.remoteJid.split('@')[1]
        
        // mensagem somente para usuarios
        if(this.msgUsuario && usergroup.startsWith('s')){
          await this.sendMsg(responseMsg)
          return
        }

        // mensagem somente para grupos
        if(this.msgUgrupo && usergroup.startsWith('g')){
          await this.sendMsg(responseMsg)
          return
        }

        // mensagem quando o usuario não especificar
        if(!this.msgUgrupo && !this.msgUsuario){
          await this.sendMsg(responseMsg)
          return
        }

      } else {
        Logs.error("WebhookMsgUpsert", `Mensagem inválida recebida de ${this.remoteJid}`);
      }
    } catch (error) {
      Logs.error("WebhookMsgUpsert", `[ ERROR CATCHE ] ${error}`);
    }
  }

  async aiMessageCreate():Promise<string>{
    let upPrompt:string=''

    if(this.prompt.length > 0){
      for(let i=0; i <  this.prompt.length; i++){
          if(this.prompt[i].isActive){
            upPrompt+= ' ' + this.prompt[i].content + "\n\n"
          }
          
      }
      upPrompt= upPrompt.trim()
    }
    const userMsg= `
      **Responsta de acodo com o script, não invente ou diga nada que não esteja escrito abaixo:**
      ${upPrompt}

      **Minha pergunta e:**
      ${this.message}
    `
    console.log(`${userMsg}`)
    // GERAR A MENSAGEM PELA IA  AQUI ... E RETORNAR A RESPOSTA
    return 'qualquer coisa'
  }

  // ENVIA A MENSAGEM PARA O USÚARIO
  async sendMsg(msg:string){
    if(!msg) return
    
    await sendMessageText({
      apikey: this.apikey,
      instance: this.instance,
      message: msg, 
      number: this.remoteJid
    })
  }

  // BUSCA OS BOT E PROMPTS ATIVOS DO USÚARIO
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
