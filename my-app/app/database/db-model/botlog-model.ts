import { BotLog } from "@prisma/client";
import { prismaConnect } from "../db-connect";
import { Logs } from "@/app/core/logs";

type outputType = BotLog;

export type inputType = {
    id: string;
    botId: string;
    message: string;
    type: 'INFO'|'WARNING'|'ERROR'|'SUCCESS' ;
    createdAt: Date;
};

export type BotLogCreateType = Omit<inputType, 'id' | 'createdAt'>;

class BotLogModel {
    private database;

    constructor() {
        this.database = prismaConnect.botLog;
    }

    async create(data: BotLogCreateType): Promise<outputType | null> {
        const { botId, message, type } = data;

        try {
            const execute = await this.database.create({
                data: { botId, message, type }
            });
            return execute;
        } catch (error) {
            Logs.error('database create', `Erro ao criar o log do bot [ ${data} ]: ${error}`);
            return null;
        }
    }

    async findById(id: string): Promise<outputType | null> {
        try {
            const execute = await this.database.findFirst({
                where: { id }
            });
            if (!execute) {
                Logs.error('database findById', `O log com o ID [ ${id} ] não existe`);
                return null;
            }
            return execute;
        } catch (error) {
            Logs.error('database findById', `Erro ao buscar o log com o ID [ ${id} ]: ${error}`);
            return null;
        }
    }

    async findByBotId(botId: string): Promise<outputType[] | null> {
        try {
            const execute = await this.database.findMany({
                where: { botId }
            });
            if (execute.length === 0) {
                Logs.error('database findByBotId', `Nenhum log encontrado para o bot com o ID [ ${botId} ]`);
                return null;
            }
            return execute;
        } catch (error) {
            Logs.error('database findByBotId', `Erro ao buscar logs para o bot com o ID [ ${botId} ]: ${error}`);
            return null;
        }
    }
}

export default BotLogModel;
