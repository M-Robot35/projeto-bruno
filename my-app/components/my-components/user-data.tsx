'use client'
import React, { useState, useEffect, useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { templateTelefone } from "@/app/core/helpers/utils"
import { userFormAction } from "@/app/actions/userFormAction"

const border=''

type userDataType = { 
    name: string
    email: string
    telefone: string
}

export default function UserData({userData}: { userData: userDataType}){  
    const [showMessage, setShowMessage] = useState<{type: 'success' | 'error'| 'error2', message: string} | null>(null)
    
    const [userdata, setUserdata]= useState<userDataType>( {
        name: '',
        telefone: '',
        email: '',
    })

    useEffect(()=>{ setUserdata({...userData}) }, [userData])
    const [state, formAction, isPending]= useActionState(userFormAction, null)

    useEffect(()=>{
         if(state?.success){
             setShowMessage({type: 'success', message: state.success})
         }else if(state?.error2){
             setShowMessage({type: 'error2', message: state.error2})
         }
         setTimeout(()=>{
             setShowMessage(null)
         }, 3000)
    }, [state])

    return (
        <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex flex-col gap-4 gap-y-4">
                <form 
                    action={formAction}
                    className="flex flex-col gap-4 gap-y-4"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input 
                            id="name"
                            className={`${border} p-2`}
                            type="text" 
                            name="name"                             
                            placeholder="Nome"
                            value={userdata.name} 
                            onChange={(e)=>{setUserdata({...userdata, name: e.target.value})}}
                        />
                        {state?.error?.name && <p className="text-red-500">{state.error.name}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email"
                            className={`${border} p-2`}
                            type="text" 
                            name="email" 
                            disabled={isPending}
                            placeholder="Email"
                            value={userdata.email} 
                            onChange={(e)=>{setUserdata({...userdata, email: e.target.value})}}
                        />
                        {state?.error?.email && <p className="text-red-500">{state.error.email}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input 
                            id="telefone"
                            className={`${border} p-2`}
                            type="text" 
                            name="telefone"     
                            disabled={isPending}
                            placeholder="Telefone"
                            value={userdata.telefone} 
                            onChange={(e)=>{setUserdata({...userdata, telefone: templateTelefone(e.target.value)})}}
                        />
                        {state?.error?.telefone && <p className="text-red-500">{state.error.telefone}</p>}
                    </div>
                    
                    {isPending ?
                        <Button disabled={isPending} variant="outline" type="reset">Salvando...</Button> :
                        <Button disabled={isPending} variant="outline" type="submit">Salvar</Button>
                    }
                    {showMessage && (
                        <div className={`mb-4 rounded-md ${showMessage.type === 'success' ? ' text-green-700' : ' text-red-700'}`}>
                            {showMessage.message}
                        </div>
                    )}
               </form>
            </div>
        </div>
    )
}