import BackspacePage from "@/components/my-components/back-space"


export default function Page() {
  
  return (
    <div className="container flex flex-1 flex-col gap-2 p-4">
      <BackspacePage />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">

        <div className="bg-muted/50 aspect-video rounded-xl" >
          <div className="p-4 relative  h-full">
            <h1>Whatsapp Instâncias</h1>
            <h1 className="flex justify-center font-extrabold text-4xl self-baseline mt-2">0</h1>
          </div>
        </div>
        
        <div className="bg-muted/50 aspect-video rounded-xl" />
        
        <div className="bg-muted/50 aspect-video rounded-xl" />

      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}