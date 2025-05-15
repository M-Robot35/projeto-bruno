
import z from 'zod'
import { Logs } from '@/app/core/logs'
type interfaceOptionEnum = "WHATSAPP-BAILEYS" | "WHATSAPP-BAILEYS" | "WHATSAPP-BUSINESS" | "EVOLUTION"

interface InstanceOptions {
    instanceName:string
    qrcode?: boolean
    integration?: interfaceOptionEnum
}

// validações
const createSchema = z.object({
    instanceName: z
        .string({message: 'Falta o nome da instancia'})
        .trim()
        .min(2,'Instancia name deve ter no minimo 2 characteres'),
    qrcode: z
        .boolean({message:'falta o qrcode'})
        .optional(),
    integration: z
        .enum([
        "WHATSAPP-BAILEYS","WHATSAPP-BAILEYS","WHATSAPP-BUSINESS","EVOLUTION"
    ]).optional()
})

export function SchemaCreateInstance(data:InstanceOptions){

    const check= createSchema.safeParse({
        instanceName: data.instanceName,
        qrcode: data?.qrcode,
        integration: data?.integration
    })

    if(!check.success){
        Logs.error("SchemaCreateInstance", JSON.stringify(check.error.flatten().fieldErrors))
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