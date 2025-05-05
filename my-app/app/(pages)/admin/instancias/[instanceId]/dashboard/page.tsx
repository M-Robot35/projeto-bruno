
import InstanciasTabs from "@/components/my-components/wa-instancia-tabs";
import BackspacePage from "@/components/my-components/back-space";
import AvatarImageUser from "@/components/my-components/avatar";
import { redirect } from "next/navigation";
import {
  User, 
  MessageCirclePlus,
  BotMessageSquare,  
} from "lucide-react"

import { whatsappInstanceByID, whatsappMeusGrupos } from "@/app/actions/whatsappActions";
import { templateTelefone } from "@/app/core/helpers/utils"

interface instaceOptions {
  params: {
    instanceId: string
  }
}

export default async function InstanceOptions({ params }: instaceOptions) {
  const {instanceId}= await params
  
  // se ñ tiver name e apike return para instancias
  if(!instanceId)  return redirect('/admin/instancias')

  // pega a instancia pelo ID
  const getInstance= await whatsappInstanceByID(instanceId)
  if(!getInstance) return redirect('/admin/instancias')

  const {name,token,...props}= getInstance

  return (
    <section className="container grid grid-cols-1 gap-4 p-2 rounded-sm ">
      <BackspacePage/>
      {/* Dashboard */}
      <section className="grid grid-cols-2  sm:grid-cols-4 gap-4 relative">
        <div className="aspect-3/1 object-cover border bg-muted/50 rounded-sm">
          
          <div className="flex gap-2 items-center p-2 rounded-sm ">
            <AvatarImageUser urlImage={props.profilePicUrl} />            
            <div className="flex gap-2">
              <h1 className="font-extrabold capitalize">{name}</h1>
              {props.profileName? <p className="text-gray-500">{` - ${props.profileName}`}</p>: ''}              
            </div>            
          </div>
          <p className="mt-2 text-gray-500 text-center">{templateTelefone(props.ownerJid)}</p>
        </div>

        <div className="aspect-3/1 object-cover border  p-2 bg-muted/50 rounded-sm">
          <div className="flex flex-row gap-2 font-bold"><User/> <span>Contatos</span></div>
          <h1 className="text-center font-extrabold text-2xl mt-2">{props._count.Contact}</h1>
        </div>
        
        <div className="aspect-3/1 object-cover border p-2 rounded-sm  bg-muted/50">
        <div className="flex flex-row gap-2 font-bold"><MessageCirclePlus/> <span>Chats</span></div>
          <h1 className="text-center font-extrabold text-2xl mt-2">{props._count.Chat}</h1>
        </div>

        <div className="aspect-3/1 object-cover border p-2 rounded-sm bg-muted/50">
        <div className="flex flex-row gap-2 font-bold"><BotMessageSquare/> <span>Mensagens</span></div>
          <h1 className="text-center font-extrabold text-2xl mt-2">{props._count.Message}</h1>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 bg-muted/50 p-2 rounded-sm">
        <InstanciasTabs apiKey={token} instanceName={name} />
      </section>
    </section>
  );
}