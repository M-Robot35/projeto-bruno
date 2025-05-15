'use client'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState,useEffect } from "react"
import { toast } from "sonner"
import { Bot, BotOff, Trash } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "../ui/button"
import { botGetByName } from "@/app/controller/bot/bot-getController"
import { botType } from "@/app/controller/bot/bot-getController"
import { botUpdateAction } from "@/app/actions/botActions"
import { useActionState } from "react"
import { promptCreateController } from "@/app/controller/prompt/prompt-createController"
import { promptGetController, PromptType } from "@/app/controller/prompt/prompt-getController"
import { promptUpdateController } from "@/app/controller/prompt/prompt-updateController"
import Loading from "./loading"
import { Input } from "../ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { promptDeleteController } from "@/app/controller/prompt/prompt-deleteController"

const descricaoPausa=`
Se você enviar uma mensagem para um usuario o Bot fica aguardando pelos Minutos escolhidos
ao passa esse tempo ele volta a responder.
Exemplo:
o bot está atendendo 10 pessoas, caso você comece a conversar com 1 pessoa, ele pausa a conversa
com aquela pessoa más continua respondendo as outras 9 pessoas.
`

const descricaoPrompt=`
Ordens que o Bot deve seguir para o atendimento do cliente, deixe as ordens bem claras
para que não tenha confusão na hora do Bot responder alguma pergunta.
`

export default function IaConfig({ name }:{ name:string }) {
    const [usePrompts, setPrompts] = useState<PromptType[]>([])
    const [usePause,setUsePause]=useState<string>("0")
    const [useBot, setBot] = useState<botType | null>(null)
    const [useLoading, setUseLoading]= useState<boolean>(false)
    
    // carrega o bot da instancia do usuario
    const buscaBot= async ()=>{
        const busca= await botGetByName(name)
        setBot(busca)
    }

    // prompts do bot do usuario
    const buscaPrompts= async (reload:boolean=false)=>{
        const botId= useBot.id
        
        if(useBot && botId){
            const prompts= await promptGetController(botId)
            setPrompts(prompts)
        }        
    }
    
    useEffect(() => {

        const carregar = async () => {
            setUseLoading(true);
            const bot = await botGetByName(name);
            setBot(bot);
            const prompts = await promptGetController(bot.id);

            setPrompts(prompts);
            setUseLoading(false);
        };
    
        carregar();
    }, []);

    // MARCAR COMO ATIVO/DESATIVADO O PROMPT
    const handleCheckd =async (promptId: string) => {
        try{
            const promptSearch= usePrompts.find(pro => pro.id === promptId)
            await promptUpdateController(promptId,{
                isActive: !promptSearch.isActive
            },useBot.id)
            buscaPrompts()
            toast.success(`[ PROMPT ][ ${!promptSearch.isActive?'ATIVO':'DESATIVADO'} ]`)
        }catch(err){
            toast.error('Não foi possivel Atualizar')
            console.log(err)
        }
    }

    // SALVAR O PROMPT
    const handleSalvarPrompt =async (promptId: string ) => {
        try{
            const promptSearch= usePrompts.find(pro => pro.id === promptId)
            await promptUpdateController(promptId,{
                content: promptSearch.content
            },useBot.id)
            buscaPrompts()
            toast.success(`[ PROMPT ][ SALVO ]`)
        }catch(err){
            toast.error('Não foi possivel Atualizar')
            console.log(err)
        }
    }
    
    // OK
    const handleTextPrompt= (promptId: string, prompt:string)=>{
        setPrompts(prev =>
            prev.map(p =>
              p.id === promptId ? { ...p, content: prompt } : p
            )
          );
    }

    // DELETAR O PROMPT
    const handleDeletePrompt= async (id:string)=>{
        const execute= await promptDeleteController(id, useBot.id)
        if(!execute.success){
            toast.error('Não foi possivel Atualizar')
            return
        }
        buscaPrompts()
        toast.success('Atualizado com Sucesso !!!')
    }

    // ATIVAR/DESATIVAR O BOT
    const handleActive= async ()=>{
        try{
            if(useBot.status === 'ATIVO'){
                await botUpdateAction(useBot.id, {status:"DESATIVADO"})
                buscaBot()
                toast.success(`[ BOT ][ ${'DESATIVADO'} ]`)
                return
            }
            await botUpdateAction(useBot.id, {status:"ATIVO"})
            buscaBot()
            toast.success(`[ BOT ][ ${'ATIVO'} ]`)
        }catch(e){
            toast.error(`[ BOT ][ ERROR ]`)
        }
    }

    return (
        <section>
            {/* Configurações Bots */}
            <div className="flex flex-col justify-end border border-gray-500 rounded-sm py-2 gap-2 px-2">
                <div className="text-right">
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" 
                            checked={( useBot && useBot.status === 'ATIVO')}
                            onCheckedChange={handleActive}
                        />
                        <Label htmlFor="airplane-mode">Active Bot</Label>
                    </div>
                </div>                
                
                <div className="text-right">
                    <div className="flex items-center space-x-2">
                        <Switch id="pause_msg" />
                        <Label title={descricaoPausa} htmlFor="pause_msg">Pausar Conversa</Label>
                        <div className="flex flex-row items-center w-fit">
                            <Input 
                                className="w-[60px] mr-1"
                                type="number" 
                                value={usePause}
                                onChange={(event)=>{
                                    const v= event.target.value
                                    const v_number= Number(v.replace(/\D/g, ''))
                                    setUsePause(v)                                    
                                    if(v.startsWith('-') || v === "" || v_number < 0){
                                        setUsePause("0")
                                    }
                                    if(v_number > 10){
                                        setUsePause("10")
                                    }                                    
                                }}
                            />
                            Minutos
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Prompts para orientar o Bot */}
            <div className="flex flex-col gap-4 ">
                <div className="w-full">
                    <div className="flex justify-between mt-4">
                        <div>
                            <h1 className="font-bold text-[1.2em]">Meus Prompts</h1>
                        </div>
                        <div>
                            <SavePrompt reload={buscaPrompts} botId={(useBot && useBot.id)? useBot.id: ""}/>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        
                        {/* quando não tem prompts */}
                        {   usePrompts.length === 0?
                            useLoading?<Loading/>:
                            <div className="text-center font-bold border rounded-sm p-2 mt-4">
                                você ainda não tem um Prompt para seu Bot
                            </div>:
                            
                            //quando não tem prompts 
                            usePrompts.map((pt) => {
                                return (                                    
                                    <AccordionItem value={pt.id} className="">
                                        <AccordionTrigger >
                                            <span title={pt.title? descricaoPrompt:pt.content} className={`flex flex-nowrap text-nowrap items-center gap-2`}>
                                                {pt.isActive ? <Bot className="text-green-500" /> : <BotOff className="text-red-500" />}{pt.title}
                                            </span>
                                        </AccordionTrigger>

                                        <AccordionContent >
                                            <div className="flex justify-between">
                                                <div className="flex items-center space-x-2 mb-2 mt-2">
                                                    <Switch
                                                        id={pt.id}
                                                        checked={pt.isActive}
                                                        onCheckedChange={() => { handleCheckd(pt.id) }}
                                                    />
                                                    <Label htmlFor={pt.id}>Active</Label>
                                                </div>

                                                <div className="flex flex-row items-center gap-2">
                                                    <Trash onClick={()=>{handleDeletePrompt(pt.id)}} className="transition-all fade-in size-4 text-red-500 cursor-pointer"/>
                                                    <Button  
                                                        onClick={()=>{handleSalvarPrompt(pt.id)}}
                                                        className="p-1 hover:text-green-500" 
                                                        variant={'ghost'}>
                                                            Salvar
                                                    </Button>
                                                </div>
                                            </div>
                                            <Textarea
                                                value={pt.content}
                                                placeholder="Instruções para seu Agent"
                                                onChange={(event)=>{handleTextPrompt(pt.id, event.target.value)}}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>

        </section>
    )
}


//  TOGGLE -----------------------------------------------

export function SavePrompt({botId, reload}:{botId:string, reload:()=> void}) {
    const [state, action, pending]= useActionState(promptCreateController, null)
    const [useMensagens, setUseMensagens]= useState<string | null>(null)
    
    
    useEffect(()=>{
        if(state && state['success']){
            reload()
            setUseMensagens("Success")
            setTimeout(()=>{setUseMensagens(null)}, 6000)
        }
    },[pending])


    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Prompt</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crie um novo Prompt</DialogTitle>            
          </DialogHeader>          
          <form action={action} className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-right">
                Prompt Name
              </Label>
              <Input 
                    id="title" 
                    name="title" 
                    className="col-span-3"
                />
            </div>
            <div className="hidden">              
              <Input 
                    id="botId" 
                    name="botId"
                    value={botId??""}
                    className="col-span-3" 
                />
            </div>
            <DialogFooter>
                {
                    pending?
                        <Button disabled={!(botId.length > 0)} type="submit">Criando...</Button>:
                        <Button disabled={!(botId.length > 0)} type="submit">Criar</Button>
                }
                
            </DialogFooter>
            {
                state && state['success'] && useMensagens && (
                    <div className="p-2 font-bold rounded-sm text-center w-full bg-green-200 text-green-900"> {useMensagens} </div >
                )
            }
            </form>          
        </DialogContent>

      </Dialog>
    )
  }