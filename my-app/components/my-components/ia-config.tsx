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

export default function IaConfig() {
    const [usePrompts, setPrompts] = useState<typeof prompts>(prompts)

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
            <div className="flex justify-end border border-gray-500 rounded-sm py-2 gap-2 px-2">
                <div className="text-right">
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label htmlFor="airplane-mode">Active Bot</Label>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 bg-gray-800 ">
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
                                            <span className={`flex flex-nowrap text-nowrap items-center gap-2`}>
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
                                                    <Trash className="transition-all fade-in opacity-0 hover:opacity-100 size-4 text-red-500 cursor-pointer"/>
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