'use client'
import { frontConstants } from "@/app/core/constants/front-constants"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"


export default function Page(){
    const paths= frontConstants.integracoes_path    
    return (
        <section className="p-6 space-y-6 w-full">
          <h1 className="text-2xl font-bold ">Dashboard do Servidor</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           
              {paths.map((item, index) => (
                <a href={item.url} target="_blank" key={index}>
                  <Card className="flex flex-col gap-4 hover:border hover:border-amber-300">
                    <CardHeader>
                      <CardTitle className="text-nowrap whitespace-nowrap">{item.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </a>
              ))}    
            </div>
        </section>
      )
}