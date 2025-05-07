import { Prompt } from "@prisma/client";
import { prismaConnect } from "../db-connect";
import { Logs } from "@/app/core/logs";

type outputType = Prompt;

export type PromptCreateType = {
    title: string;
    content: string;
    botId: string;
};

class PromptModel {
    private database;

    constructor() {
        this.database = prismaConnect.prompt;
    }

    async create(data: PromptCreateType): Promise<outputType | null> {
        const { botId, title } = data;

        const existingPrompt = await this.database.findFirst({
            where: { botId, title }
        });

        if (existingPrompt) {
            Logs.error('database create', `O prompt [ ${data} ] já existe`);
            return null;
        }

        const execute = await this.database.create({
            data: { ...data }
        });
        return execute;
    }

    async findById(id: string): Promise<outputType | null> {
        const execute = await this.database.findFirst({
            where: { id }
        });
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
}

export default PromptModel;

