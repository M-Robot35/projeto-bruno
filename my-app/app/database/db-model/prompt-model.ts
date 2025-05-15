import { Prompt } from "@prisma/client";
import { prismaConnect } from "../db-connect";
import { Logs } from "@/app/core/logs";
import z from 'zod'

export const promptCreateSchema= z.object({
    //id: z
    //  .string({message: 'falta ID'})
    //  .trim(),
    title: z
        .string({message: 'falta TITLE'})
        .trim(),
    botId: z
        .string({message: 'falta BOTID'})
        .trim(),
    isActive: z
        .boolean({message: 'falta IsACTIVE'})
        .optional(),
    content: z
        .string({message: 'falta CONTENT'})
        .trim()
        .optional(),
})

export const promptUpdatechema= z.object({
    title: z
        .string({message: 'falta TITLE'})
        .trim()
        .optional(),
    botId: z
        .string({message: 'falta BOTID'})
        .trim()
        .optional(),
    isActive: z
        .boolean({message: 'falta IsACTIVE'})
        .optional(),
    content: z
        .string({message: 'falta CONTENT'})
        .trim()
        .optional(),
})

type outputType = Prompt;

export type PromptCreateType = {
    title: string;
    botId: string;
    content?: string;
    isActive?: boolean
};
type UpdateType= Partial<Omit<Prompt,'id'|'createdAt'|'updatedAt'>>

class PromptModel {
    private database;

    constructor() {
        this.database = prismaConnect.prompt;
    }

    async create(data: PromptCreateType): Promise<outputType | null> {
        const validate= promptCreateSchema.safeParse(data)
            
        if(!validate.success){
            Logs.error('promptCreate', ` [ INPUT ] === ${JSON.stringify(data)}`)
            Logs.error('[ promptCreate ] === ', JSON.stringify(validate.error.flatten().fieldErrors))
            return null
        }
        const { botId, title } = data;

        const existingPrompt = await this.database.findFirst({
            where: { botId, title }
        });

        if (existingPrompt) {
            Logs.error('database create', `O prompt [ ${data} ] já existe`);
            return null;
        }

        const execute = await this.database.create({
            data
        });
        return execute;
    }

    async findById(id: string): Promise<outputType | null> {
        const execute = await this.database.findFirst({
            where: { id }
        });
        return execute;
    }

    async findAllUser(botId: string): Promise<outputType[] | []> {
        const execute = await this.database.findMany(
            {
                where:{botId}
        })
        return execute;
    }

    async findByTitle(title: string): Promise<outputType | null> {
        try {
            const execute = await this.database.findFirst({
                where: { title }
            });
            if (!execute) {
                Logs.error('database findByTitle', `O prompt com o título [ ${title} ] não existe`);
                return null;
            }
            return execute;
        } catch (error) {
            Logs.error('database findByTitle', `Erro ao buscar o prompt com o título [ ${title} ]: ${error}`);
            return null;
        }
    }

    async update(promptId: string, data:UpdateType): Promise<outputType | null> {
        try {
            const validate= promptUpdatechema.safeParse(data)
            if(!validate.success){
                Logs.error(`[ EXECUTE ][ PROMPT UPDATE ]=> `, JSON.stringify(data))
                return null
            }
            const execute = await this.database.update({
                where: { id: promptId },
                data
            });
            if (!execute) {
                Logs.error('database update', `O prompt com o título [ ${promptId} ] não existe`);
                return null;
            }
            return execute;
        } catch (error) {
            Logs.error('database update', `Erro ao buscar o prompt com o título [ ${promptId} ]: ${error}`);
            return null;
        }
    }

    async deletePrompt(id: string): Promise<outputType | null> {
        try {
            const execute = await this.database.delete({
                where: { id }
            });

            return execute;
        } catch (error) {
            Logs.error('database findByTitle', `Erro ao buscar o prompt com o título [ ${id} ]: ${error}`);
            return null;
        }
    }
}

export default PromptModel;

