'use client'

import {CircleFadingPlus} from 'lucide-react'
import { Button } from "../ui/button"

import * as React from "react"
 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useActionState } from "react"
import { FormWhatsappCreateInstance,whatsappDelete,whatsappStatus } from "@/app/actions/whatsappActions"
import { toast } from "sonner"

const initStateWpp= {
    qrCode:'',
    showCode:false,
    name:''
}

type requerements= {
    instanceName?:string,
    handleReload?:any
}

export default function WhatsaCreateInstanceUser({...Props}:requerements){
    const [state, setState]= useState<typeof initStateWpp>(initStateWpp)
    const [wppState, wppAction, wppPending]= useActionState(FormWhatsappCreateInstance,null)
    
    useEffect(()=>{
        if(!wppState){
            toast.error('Não foi possivel Criar a instancia')
            clear()
            return
        }
        const qr= wppState.qrcode.base64

        setState((prev)=>{
            return {...prev, 
                qrCode:qr, 
                showCode:true,
                name: wppState.instance.instanceName,
            }
        })

        Props.handleReload()        
    },[wppState])

    const cancelarInstancia= async ()=>{
        const execute= await whatsappDelete(null, state.name)
        if(!execute){
            toast.error('Não foi possivel Deletar a instancia')
            return
        }
        clear()

        Props.handleReload()
        setTimeout(()=>{Props.handleReload()}, 5000)
        toast.error('Ah instancia foi Deletada com Sucesso !!!')
    }

    // limpar dados
    function clear(){
        setState((prev)=>{
            return {...prev, 
                qrCode:'', 
                showCode:false,
                name:'',
                count:0,
                isContent:false
            }
        })
    }

    return (
        <section >
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline"><CircleFadingPlus/> Instancia</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Criar Instancia</DialogTitle>
                    <DialogDescription>
                        Automatize o seu Whatsapp Message
                    </DialogDescription>
                    </DialogHeader>
                    <form action={wppAction} >
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="instancia" className="text-right">
                            Nome da Instancia
                            </Label>
                            <Input
                            id="instancia" 
                            name="instancia"                            
                            className="col-span-3"
                            placeholder="Minha instancia"
                            disabled={state.qrCode.length>1}
                            />
                        </div>
                    </div>
                    
                    <DialogFooter>                    
                    {
                        state.qrCode.length == 0 && (
                            !wppPending?
                            <Button type="submit">Criar</Button>:
                            <Button type="reset" disabled>Criando...</Button>
                        )
                    }
                    </DialogFooter>
                    </form>
                    {
                        (state.qrCode.length>1) && (
                            <Button onClick={cancelarInstancia}>Cancelar</Button>
                        )
                    }
                    {
                        state.showCode && (
                            <div className=" self-start">
                                <div className="">
                                    <p className="font-bold text-center mb-1">30s para Escaneie o QrCode</p>
                                    <img src={state.qrCode} alt="Image" className=" w-full h-full rounded-md  object-cover" />
                                </div>
                            </div>
                        )
                    }  
                </DialogContent>
            </Dialog>            
        </section>
    )
}