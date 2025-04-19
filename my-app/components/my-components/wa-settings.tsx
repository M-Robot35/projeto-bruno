'use client'
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { settingsGetAction,settingsUpdateAction } from "@/app/actions/instanceComponentsActions"
import { ISettings } from "@/app/services/evolution/evoluitonTypes/instances-type"

export interface IIinstaceParams {
    instanceName:string
    apiKey:string
}

const translate = (palavra: string) => {
    const traduzir: Record<string, string> = {
      rejectCall: "Rejeitar chamada",
      msgCall: "Mensagem após rejeitar",
      groupsIgnore: "Ignorar Grupos",
      alwaysOnline: "Sempre Online",
      readMessages: "Ler Mensagens",
      readStatus: "Ler Status",
    };
    return traduzir[palavra] || palavra;
};

const set= {
  groupsIgnore: false,
  msgCall: "",
  alwaysOnline: false,
  readMessages: false,
  readStatus: false,
  rejectCall: false,
  syncFullHistory: false,
};

export default function InstanceSettings({ apiKey, instanceName }: IIinstaceParams) {
  const [settings, setSettings] = useState<ISettings>(set);

    const setting = async () => {
      const execute = await settingsGetAction(null,{apikey:apiKey,instanceName});  
      if(!execute) return      
      setSettings(execute)
    };

    useEffect(() => { setting() }, []);

    const settingsUpdate= async ()=>{
      const execute= await settingsUpdateAction(null,{apikey:apiKey, instanceName, options:{...settings} })
      if(!execute){
        return
      }
      setting()
      toast('[SUCCESS] Settings',{
      description:'Settings atualizada com sucesso'
    })      
    }
  
    return (
      <div className="flex flex-col gap-2">
        {settings &&
          Object.entries(settings).map(([key, value]:[key:string, value:string|boolean]) => (
            <div key={key} className="flex justify-between items-center border border-gray-700 p-2 rounded-sm">
              <Label htmlFor={key}>{translate(key)}</Label>
              
              {typeof value === "boolean" ? (
              <Switch
                id={key}
                checked={ value }
                onCheckedChange={()=>{setSettings({...settings, [key]:!value} )}}
                className={''}
              />
            ) : (
              <Input 
                  className={`w-[70%]`}
                  id={key}
                  value={typeof value === 'string' ? value : ''}
                  onChange={(e)=>{ setSettings({...settings, [key]:e.target.value}) }}
                  type="text" 
                  placeholder="Mensagem"
              />
            )}
            </div>
          ))}
          <div className="text-right">
            <Button className="" onClick={settingsUpdate} variant={'outline'}>Salvar</Button>
          </div>
      </div>
    );
  }
