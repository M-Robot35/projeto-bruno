'use client'
import { proxyGetAction,proxyUpdateAction } from "@/app/actions/instanceComponentsActions"
import { useEffect, useState } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"

export interface IIinstaceParams {
    instanceName:string
    apiKey:string
}

export default function InstanceProxy({ apiKey, instanceName }: IIinstaceParams) {
    // const [proxy, setProxy] = useState<IProxySetOptions | null>(null);
    const [active, setActive]= useState<boolean>(false)

    const[protocolo, setProtocolo]= useState('')
    const[host, setHost]= useState('')
    const[porta, setPorta]= useState('')
    const[usuario, setUsuario]= useState('')
    const[senha, setSenha]= useState('')
         
    useEffect(() => {
      const proxy = async () => {
        if(!apiKey && !instanceName) return

        const execute = await proxyGetAction(null,{apikey:apiKey,instanceName});
        if (execute) {
          setActive(execute);
        }
      };
      
      proxy();
    }, []);

    const proxyUpdate= async ()=>{
      const execute= await proxyUpdateAction(null,{apikey:apiKey,instanceName,options:{
        enabled: active,
        host,
        port: porta,
        username: usuario,
        password: senha,
        protocol: protocolo
      }})

      await execute
    }
    
  
    return (
      <div className="flex flex-col gap-2">
        <h1 className={`${active?'': 'hidden'}`}>
          {`${protocolo?protocolo:'protocolo'}://${host?host:'host'}:${porta?porta:'porta'}?user="${usuario?usuario:""}"&password="${senha?senha:""}"`}
        </h1>

        <div>
          <div className="flex justify-between items-center border border-gray-700 p-2 rounded-sm mb-4">
            <Label htmlFor=''>PROXY ACTIVE</Label>
            <Switch
                  checked={active}
                  onCheckedChange={()=>{setActive(!active)}}
            />
          </div>


          <div  className="grid grid-cols-1 sm:grid-cols-4 gap-2 justify-between border border-gray-700 p-2 rounded-sm">
            
            <div className="">
              <div className="flex flex-col">
                <Label className="mb-2 font-bold" htmlFor={'key'}>Protocolo</Label>    
                <Input 
                    type="text" 
                    placeholder="http"
                    disabled={!active}
                    value={protocolo}
                    onChange={(event)=>{
                      const valor = event.target.value.toLowerCase()

                      if(/^https?/.test(valor.toLowerCase()))
                        event.target.style.border=''
                      else event.target.style.border='1px solid red'
                      
                      if(!valor) event.target.style.border=''

                      setProtocolo(valor) 
                    }}
                />
              </div>
            </div>
            
            <div className="col-span-2  ">
              <div className="flex flex-col ">
                <Label className="mb-2 font-bold" htmlFor={'key'}>Host</Label>    
                <Input 
                    type="text" 
                    placeholder="0.0.0.0"
                    disabled={!active}
                    value={host}
                    onChange={(event)=>{
                      const valor = event.target.value

                      // if(/^\d+\.\d+\.\d+\.\d+/.test(valor.toLowerCase()))
                      //   event.target.style.border=''
                      // else event.target.style.border='1px solid red'

                      if(!valor) event.target.style.border=''
                      setHost(valor)
                    }}
                />
              </div>
            </div>

            <div className=" ">
              <div className="flex flex-col">
                <Label className="mb-2 font-bold" htmlFor={'key'}>Porta</Label>    
                <Input 
                    type="text" 
                    placeholder="8000"
                    disabled={!active}
                    value={porta}
                    onChange={(event)=>{
                      const valor = event.target.value.replace(/\D/, '')
                      
                      if(/\d/.test(valor.toLowerCase()))
                        event.target.style.border=''
                      else event.target.style.border='1px solid red'

                      if(!valor) event.target.style.border=''
                      setPorta(valor)
                    }}
                />
              </div>
            </div>
            
          </div>

          <div  className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-between border border-gray-700 p-2 rounded-sm mt-4">
            
            <div className="">
              <div className="flex flex-col">
                <Label className="mb-2 font-bold" htmlFor={'key'}>Usuário</Label>    
                <Input 
                    type="text" 
                    placeholder="login"
                    disabled={!active}
                    value={usuario}
                    onChange={(event)=>{
                      const valor = event.target.value
                      setUsuario(valor)
                    }}
                />
              </div>
            </div>
            
            <div className=" ">
              <div className="flex flex-col ">
                <Label className="mb-2 font-bold" htmlFor={'key'}>Senha</Label>    
                <Input 
                    type="text" 
                    placeholder="******"
                    disabled={!active}
                    value={senha}
                    onChange={(event)=>{
                      const valor = event.target.value
                      setSenha(valor)
                    }}
                />
              </div>
            </div>
            
          </div>
        </div>
        
          <div className="">
            <Button className="" onClick={proxyUpdate} variant={'outline'}>Salvar</Button>
          </div>

      </div>
    );
}