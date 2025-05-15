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
import { FormWhatsappCreateInstance,whatsappDelete,whatsappStatus, whatsappInstanceByUser } from "@/app/actions/whatsappActions"
import { toast } from "sonner"

type requerements= {
    instanceName?:string,
    handleReload?:any
}

const initStateWpp= {
    qrCode:'',
    showCode:false,
    name:''
}

const time=30

export default function WhatsaCreateInstanceUser({...Props}:requerements){
    const [state, setState]= useState<typeof initStateWpp>(initStateWpp)
    const [wppState, wppAction, wppPending]= useActionState(FormWhatsappCreateInstance,null)
    const [timeLeft, setTimeLeft] = useState(time);
    const [isActive, setIsActive] = useState(false);  

    // ativa o Timer
    if(state.showCode && !isActive){
        setIsActive(true);
        Props.handleReload()
    }

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
        toast.success('Ah instancia foi Deletada com Sucesso !!!')
    }

    // checa se a instancia foi escaneada, caso não for ele a exclui
    const checkLoggerInstance= async ()=>{
        const instance= (await whatsappInstanceByUser()).find(inst => inst.name == state.name)
        if(!instance){
            return
        }
        // deleta a instancia não logada
        if(instance.connectionStatus != 'open'){
            await cancelarInstancia()            
        }
        // atualiza o status da instancia para connectada
        if(instance.connectionStatus == 'open'){
            Props.handleReload() 
        }
        setIsActive(false);
        setTimeLeft(time)
        clear()
    }

    // limpar dados
    function clear(){
        setState((prev)=>{
            return {...prev, 
                qrCode:'', 
                showCode:false,
                name:'',
            }
        })
    }

    // timer
    useEffect(() => {
        if(!isActive || timeLeft <= 0){
            if(timeLeft <= 0){
                checkLoggerInstance()
            }
            return
        }
    
        const intervalId = setInterval(() => {
            console.log(timeLeft)
          setTimeLeft(prev => prev - 1);
        }, 1000);
        
        
        // Limpa o intervalo ao desmontar ou quando chegar a 0
        return () => clearInterval(intervalId);
    }, [isActive, timeLeft]);

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
                    {
                        !state.showCode && (
                            <form action={wppAction} >
                                <div className="grid gap-4 py-4">
                                    <div className="grid w-full items-center gap-2">
                                        <Label htmlFor="instancia" className="text-right">
                                        Nome da Instancia
                                        </Label>
                                        <Input
                                        id="instancia" 
                                        name="instancia"
                                        {...(state.qrCode.length > 1)? {value:`${state.name}`}:''}
                                        className="col-span-3"
                                        placeholder="Minha instancia"
                                        disabled={state.qrCode.length > 1}
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
                        )
                    }
                    
                    {
                        state.showCode && (
                            <div className="w-full text-center relative">
                                <div className=" w-full  text-center items-center">
                                    <p className="font-bold mb-1">{timeLeft}s para Escaneie o QrCode</p>
                                    <div className='flex justify-center'>
                                        <img src={state.qrCode} alt="Image" className="h-full rounded-md  object-cover w-[250px] bg-amber-700" />
                                    </div>
                                </div>
                            </div>
                        )
                    }  
                </DialogContent>
            </Dialog>            
        </section>
    )
}