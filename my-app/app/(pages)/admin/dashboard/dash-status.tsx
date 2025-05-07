'use client'

const all=[
    {
      name: "Instâncias Whatsapp",
      icons: "/icons/icons-whatsapp.gif",
      valor: 0
    },
    {
        name: "Instâncias Whatsapp",
        icons: "/icons/icons-whatsapp.gif",
        valor: 0
    },
    {
        name: "Instâncias Whatsapp",
        icons: "/icons/icons-whatsapp.gif",
        valor: 0
    },
    {
        name: "Instâncias Whatsapp",
        icons: "/icons/icons-whatsapp.gif",
        valor: 0
    },
]

export default function DashStatus(){    
    
    return (
        <section className="
            grid 
            auto-rows-min 
            gap-4 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4">
        {
            all.map(item =>{
                return (
                <div className="bg-muted/50 aspect-auto rounded-xl" >
                    <div className="flex flex-row items-center p-4 relative gap-2 h-full">
                    <div >
                        <img
                        className="w-[50px] h-[50px] rounded-[50%] "
                        alt="imagem whatsapp"
                        src={item.icons}                
                        />
                    </div>
                    
                    <div>
                        <h1 className="text-center">{item.name}</h1>
                        <h1 className="flex justify-center  font-extrabold text-4xl self-baseline mt-2">
                            {item.valor}
                        </h1>
                    </div>

                    </div>
                </div>  
                )
            })
        }
        </section>
    )
}