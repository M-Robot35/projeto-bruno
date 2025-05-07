import { Bot } from "@prisma/client";
import { prismaConnect } from "../db-connect";
import { Logs } from "@/app/core/logs";

type outputType = Bot;

export type inputType = {
    id: string;
    name: string;
    description?: string;
    instanceId: string;
    status: string;
    autoStart: boolean;
    startTime?: Date;
    stopTime?: Date;
};

export type BotCreateType = Omit<inputType, 'id'>;

class BotModel {
    private database;

    constructor() {
        this.database = prismaConnect.bot;
    }

    async create(data: BotCreateType): Promise<outputType | null> {
        const { name, instanceId } = data;

        const existingBot = await this.database.findFirst({
            where: { name, instanceId }
        });

        if (existingBot) {
            Logs.error('database create', `O bot [ ${data} ] já existe`);
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

    async findByName(name: string): Promise<outputType | null> {
        try {
            const execute = await this.database.findFirst({
                where: { name }
            });
            if (!execute) {
                Logs.error('database findByName', `O bot com o nome [ ${name} ] não existe`);
                return null;
            }
            return execute;
        } catch (error) {
            Logs.error('database findByName', `Erro ao buscar o bot com o nome [ ${name} ]: ${error}`);
            return null;
        }
    }
}

export default BotModel;
