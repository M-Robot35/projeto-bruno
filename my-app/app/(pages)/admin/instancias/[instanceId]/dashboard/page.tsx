
import InstanciasTabs from "@/components/my-components/wa-instancia-tabs"
import DeleteInstancia from "@/components/my-components/wa-instancia-delete"
import LogoutInstance from "@/components/my-components/wa-instancia-logout"
import InstanciaConnect from "@/components/my-components/wa-instancia-connect"
// import { getInstanceNameAction, getInstaceDatabase } from "@/app/actions/instanceAction"

import { formatNumber,statusConnection } from "@/components/my-components/wa-instancias";
import { Logs } from "@/app/core/logs";
import { redirect } from "next/navigation"
import Loading from "@/components/my-components/loading";

import { whatsappInstanceByID } from "@/app/actions/whatsappActions";

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

  const {name,token}= getInstance
  


  return (
    <section className="container bg-muted/50 p-4 rounded-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      
        {/* Data Instância */}
        {/* <div className="rounded-sm border p-4 relative">
          <div className="flex justify-between items-center">
            <div className="font-bold">Instância:</div>
            <span className="text-gray-500">{}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold">Número:</div>
            <span className="text-sm text-gray-500 whitespace-nowrap">{formatNumber('')}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold">Status:</div>
            <span className="text-sm text-gray-500">{statusConnection('')}</span>
          </div>

          
        </div> */}

        {/* Data Conteudo instancia */}
        {/* <div className="rounded-sm border p-4 "> */}
          {/* <div className="flex justify-between items-center">
            <div className="font-bold">Contatos:</div>
            <span className="text-sm text-gray-500">{}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold">Grupos:</div>
            <span className="text-sm text-gray-500">{}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold">Mensagens:</div>
            <span className="text-sm text-gray-500">{}</span>
          </div>
        </div> */}

        {/* {instanciaATUAL.connectionStatus == 'connecting' ? (
          <div className="flex justify-center">
            <DeleteInstancia name={instanciaATUAL.name} />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-2 rounded-sm border p-4">
            <InstanciaConnect instanceName={instanciaATUAL.name} />
            <LogoutInstance name={} />
            <DeleteInstancia name={instanciaATUAL.name} />
          </div>
        )} */}
      </div>

      {/* TABS */}
      {/* {instanciaATUAL.connectionStatus != 'connecting' ? (
        <InstanciasTabs instanceName={params.name} apiKey={params.apikey} />
      ) : (
        <div className="flex justify-center mt-4">
          <div className="w-[250px]">
            <h3 className="mb-2">Escaneie o QrCode</h3>
            {loadBase64Instance  && (
              <img src={loadBase64Instance} alt="qrCode" />
            )}
          </div>
        </div>
      )} */}
    </section>
  );
}

export function statusUser(){
  return (
    <section>
        <div className="stats">
          <div className="stat">
            <div className="stat-figure text-base-content size-8">
              <span className="icon-[tabler--world] size-8"></span>
            </div>
            <div className="stat-title">Website Traffic</div>
            <div className="stat-value">32K</div>
            <div className="stat-desc">5% ↗︎ than last week</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-base-content size-8">
              <span className="icon-[tabler--users-group] size-8"></span>
            </div>
            <div className="stat-title">New Signups</div>
            <div className="stat-value">1.2K</div>
            <div className="stat-desc">12% increase this month</div>
          </div>

          <div className="stat">
            <div className="stat-figure size-12">
              <div className="avatar">
                <div className="size-12 rounded-full">
                  <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png" alt="User Avatar"/>
                </div>
              </div>
            </div>
            <div className="stat-value text-success">95%</div>
            <div className="stat-title">Customer Retention</div>
            <div className="stat-desc">Steady over last quarter</div>
          </div>
        </div>
    </section>
  )
}


