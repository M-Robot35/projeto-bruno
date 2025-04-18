import BackspacePage from "@/components/my-components/back-space"
import { whatsappAllInstance } from "@/app/actions/whatsappActions"
import WaInstancias from "@/components/my-components/wa-instancias"


export default async function Page() {
  const x= await whatsappAllInstance()

  return (    
    <div className="container flex flex-1 flex-col gap-4 p-4">
      <BackspacePage/>
      
      <div className={`grid auto-rows-min gap-4 grid-cols-1 flex-wrap relative`}>
        <WaInstancias instancia={x}/>        
      </div>
    </div>     
  )
}
