
import z from 'zod'
import { Logs } from '@/app/core/logs'

interface InstanceOptions {
    instanceName:string
}

const createSchema = z.object({
    instanceName: z
        .string({message: 'Falta o nome da instancia'})
        .trim(),        
})

export function SchemaDeleteInstance(data:InstanceOptions){

    const check= createSchema.safeParse({
        instanceName: data.instanceName,
    })

    if(!check.success){
        Logs.error("SchemaDeleteInstance", JSON.stringify(check.error.flatten().fieldErrors))
        return {
            success:false,
            error: true,
            filds: check.error.flatten().fieldErrors
        }
    }

    return {
        success:true,
        error: false,
        filds: {}
    }
}