import DashStatus from "./dash-status"

const all=[
  {
    name: "Instâncias Whatsapp",
    icons: "/icons/icons-whatsapp.gif",
    valor: 0
  }
]

export default function Page() {
  
  return (
    <section className="container flex flex-1 flex-col gap-4 p-4">
      <div className="inline-flex gap-2">
        
        <div className="inline-flex gap-2 border px-2 rounded-sm">
          <h1 className="font-bold">Plano</h1>
          <p>Free</p>
        </div>

        <div className="inline-flex gap-2 border px-2 rounded-sm">
          <h1 className="font-bold">Vencimento</h1>
          <p>22/10/2025</p>
        </div>       

      </div>

      <DashStatus/>

      <section className="grid auto-rows-min gap-4 md:grid-cols-3">        

      </section>

      {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}


    </section>
  )
}