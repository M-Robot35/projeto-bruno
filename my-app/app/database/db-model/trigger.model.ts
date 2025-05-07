import { Trigger } from "@prisma/client";
import { prismaConnect } from "../db-connect";
import { Logs } from "@/app/core/logs";

type outputType = Trigger;

export type inputType = {
    id: string;
    botId: string;
    keyword: string;
    response: string;
    order?: number;
    isActive: boolean;
};

export type TriggerCreateType = Omit<inputType, 'id'>;

class TriggerModel {
    private database;

    constructor() {
        this.database = prismaConnect.trigger;
    }

    async create(data: TriggerCreateType): Promise<outputType | null> {
        const { botId, keyword } = data;

        const existingTrigger = await this.database.findFirst({
            where: { botId, keyword }
        });

        if (existingTrigger) {
            Logs.error('database create', `O trigger [ ${data} ] já existe`);
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

    async findByKeyword(keyword: string): Promise<outputType | null> {
        try {
            const execute = await this.database.findFirst({
                where: { keyword }
            });
            if (!execute) {
                Logs.error('database findByKeyword', `O trigger com a palavra-chave [ ${keyword} ] não existe`);
                return null;
            }
            return execute;
        } catch (error) {
            Logs.error('database findByKeyword', `Erro ao buscar o trigger com a palavra-chave [ ${keyword} ]: ${error}`);
            return null;
        }
    }
}

export default TriggerModel;
