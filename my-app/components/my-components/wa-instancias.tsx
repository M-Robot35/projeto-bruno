'use client'
import { IEvolutionInstance } from "@/app/services/evolution/evoluitonTypes/instances-type"
import AvatarImageUser from "./avatar"
import { useActionState, useEffect } from "react"
import { whatsappAllInstance } from "@/app/actions/whatsappActions"
import {
    whatsappDelete,
    whatsappLogout,
    whatsappRestart
} from "@/app/actions/whatsappActions"
import WhatsaCreateInstanceUser from "./wa-createInstance"
import ModalQrCode from "./modal-qrcode"
import { toast } from "sonner"
import {
    User, 
    MessageCirclePlus,
    BotMessageSquare,
    CirclePlay,
    CirclePause,
    ChevronsRight,
    CircleStop,
    RefreshCcw
} from "lucide-react"
import { Button } from "../ui/button"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"


type WaInstancias ={
    instancia:IEvolutionInstance[]
}

export const formatNumber= (numero:string)=>{
    if(!numero) return numero
    const resultado= numero.replace(/\D/g, '')
    const format= resultado.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4')
    return format
}

export const statusConnection= (status:string)=>{
  switch(status){
    case "open":
       return <div className="text-green-600 w-fit">Connectado</div>
    
    case "connecting":
        return <div className="text-yellow-600 w-fit">Reconnect</div>

    case "close":
        return <div className="text-red-600 w-fit">Desconectado</div>
    
    default:
      return status
  }
}


export default function WaInstancias({instancia}:WaInstancias){
    const [instancias, setInstancias]=useState<IEvolutionInstance[]>(instancia)
    const [instanceDelete, actionDelete, pendingDelete]= useActionState(whatsappDelete, null)
    const [instanceLogout, actionLogout, pendingLogout]= useActionState(whatsappLogout, null)
    const [instanceRestart, actionRestart, pendingRestart]= useActionState(whatsappRestart, null)
    
    const handleReload= async ()=>{
        setInstancias(await whatsappAllInstance())
    }
    
    useEffect(()=>{        
        handleReload()
        console.log('#######################  ---',instanceRestart)
        setTimeout(()=>{handleReload()}, 5000)
    },[
        instanceDelete,
        instanceLogout,
        instanceRestart
    ])

    return (
        <section className="">            
            <div>                
                <div className="flex flex-row w-full gap-2 items-center">
                    <div className="basis-full border border-gray-500 p-1 text-gray-500 rounded-sm">  pesquisa </div>
                    <Button onClick={handleReload} className="cursor-pointer hover:text-violet-500"  variant={'outline'}><RefreshCcw /></Button>
                    <WhatsaCreateInstanceUser handleReload={handleReload}/>
                </div>
                {
                    (instanceRestart && instanceRestart['base64']) && (
                        <section className="mt-6 backdrop-blur-3xl flex justify-center absolute w-full z-10 flex-col items-center">
                            <h1>Você tem 30 segundos para escanear o QrCode</h1>
                            <div className="relative bg-green-500 w-[250px] h-[250px] rounded-sm p-4">
                                <img className="w-full h-full" src={instanceRestart['base64']} alt="" />
                            </div>
                            <Button>Deletar instancia</Button>
                        </section>
                    )
                }
                <Table>
                    <TableCaption>Suas instancias do Whatsapp</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="">Instancias</TableHead>
                        <TableHead className="w-[180px]">Status</TableHead>
                        <TableHead className="">Data</TableHead>
                        <TableHead>Triggers</TableHead>
                        <TableHead className="">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {instancias.map((instancia, index) => (

                            <TableRow key={instancia.id} >
                                
                            <TableCell className="font-medium">
                                <div className="flex flex-row flex-nowrap gap-2">
                                    <AvatarImageUser urlImage={instancia.profilePicUrl}/>
                                    <div>
                                        <div className="italic capitalize">{instancia.name}{instancia.profileName? ` - ${instancia.profileName}`:''}</div>
                                        <div className="text-gray-500 italic">{instancia.ownerJid? formatNumber(instancia.ownerJid):`(99) 99999-9999`}</div>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="">
                                {statusConnection(instancia.connectionStatus)}
                            </TableCell>

                            <TableCell>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <p className="flex flex-row gap-1 items-center" title="Contatos"><User /> <span>{instancia._count.Contact}</span></p>
                                    <p className="flex flex-row gap-1 items-center" title="Chats"><MessageCirclePlus /> <span>{instancia._count.Chat}</span></p>
                                    <p className="flex flex-row gap-1 items-center" title="Messagens"><BotMessageSquare /> <span>{instancia._count.Message}</span></p>
                                </div>
                            </TableCell>

                            <TableCell>
                               <div className="flex flex-wrap gap-2">
                                    {
                                        (instancia.connectionStatus == 'connecting')?
                                        <CirclePlay className={`cursor-pointer hover:text-green-500 ${instancia.connectionStatus? 'text-green-500 animate-bounce':''}`} onClick={()=>{actionRestart(instancia.name)}}/>:
                                        <CirclePlay className={`cursor-pointer hover:text-green-500 ${pendingRestart? 'text-green-500 animate-bounce':''}`} onClick={()=>{actionRestart(instancia.name)}}/>

                                    }
                                    <CirclePause className={`cursor-pointer hover:text-yellow-500 ${pendingLogout? 'text-yellow-500 animate-bounce':''}`} onClick={()=>{actionLogout(instancia.name)}}/>
                                    <CircleStop className={`cursor-pointer hover:text-red-500 ${pendingDelete? 'text-red-500 animate-bounce':''}`} onClick={()=>{actionDelete(instancia.name)}}/>
                               </div>
                            </TableCell>

                            <TableCell className="">
                                <div></div>
                                <a href={`/admin/instancias/${instancia.id}/dashboard`} >
                                    <ChevronsRight className="text-right hover:bg-gray-500 rounded-sm"/>
                                </a>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>                
            </div>

        </section>
    )
}