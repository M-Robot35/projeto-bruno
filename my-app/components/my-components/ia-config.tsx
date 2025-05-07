'use client'

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Bot, BotOff, Trash } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "../ui/button"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "../ui/input"


const prompts = [
    {
        id: '1',
        nome: 'bruno',
        numero: '31 98501 9300',
        prompt: 'esse e o numero 1',
        active: false
    },
    {
        id: '2',
        nome: 'bruno 22',
        numero: '31 98501 9300',
        prompt: 'batatinha frita 123',
        active: false
    },
    {
        id: '3',
        nome: 'bruno 33',
        numero: '31 98501 9300',
        prompt: 'nada a ver',
        active: false
    },
    {
        id: '4',
        nome: 'bruno 44',
        numero: '31 98501 9300',
        prompt: 'mais mais mais',
        active: true
    },
]

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

export default function IaConfig() {
    const [usePrompts, setPrompts] = useState<typeof prompts>(prompts)
    const [usePause,setUsePause]=useState<string>("0")

    // muda ativa um novo prompt e desabilita os outros
    const handleCheckd = (promptId: string) => {
        setPrompts(prev => {
            return prev.map(item => {
                return { ...item, active: (item.id == promptId) ? true : false }
            })
        })
    }
    
    // altera o prompt no text area
    const handleTextPrompt= (promptId: string, prompt:string)=>{
        setPrompts(prev => {
            return prev.map(item => {
                if(item.id == promptId){
                    return { ...item, prompt:prompt }
                }
                return item
            })
        })
    }

    return (
        <section>
            {/* Configurações Bots */}
            <div className="flex flex-col justify-end border border-gray-500 rounded-sm py-2 gap-2 px-2">
                <div className="text-right">
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
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
                            <Button variant={'outline'}>Adicionar Prompt</Button>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {
                            usePrompts.map((pt) => {
                                return (
                                    <AccordionItem value={pt.id} className="">
                                        <AccordionTrigger >
                                            <span title={pt.active? descricaoPrompt:pt.prompt} className={`flex flex-nowrap text-nowrap items-center gap-2`}>
                                                {pt.active ? <Bot className="text-green-500" /> : <BotOff className="text-red-500" />}{pt.nome}
                                            </span>
                                        </AccordionTrigger>

                                        <AccordionContent >
                                            <div className="flex justify-between">
                                                <div className="flex items-center space-x-2 mb-2 mt-2">
                                                    <Switch
                                                        id={pt.id}
                                                        checked={pt.active}
                                                        onCheckedChange={() => { handleCheckd(pt.id) }}
                                                    />
                                                    <Label htmlFor={pt.id}>Active</Label>
                                                </div>

                                                <div className="flex flex-row items-center gap-2">
                                                    <Trash className="transition-all fade-in size-4 text-red-500 cursor-pointer"/>
                                                    <Button className="p-1 hover:text-green-500" variant={'ghost'}>Salvar</Button>
                                                </div>
                                            </div>
                                            <Textarea
                                                value={pt.prompt}
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