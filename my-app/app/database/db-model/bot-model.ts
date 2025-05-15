import { Bot } from "@prisma/client";
import { prismaConnect } from "../db-connect";
import { Logs } from "@/app/core/logs";

type outputType = Bot;

export type inputType = {
    id: string;
    name: string;
    description?: string;
    instanceId: string;
    status?: "ATIVO"|"PAUSADO"|"DESATIVADO"|"AGENDADO"|"ERRO";
    autoStart?: boolean;
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
    
    async update(id: string, data: Partial<BotCreateType>): Promise<outputType | null> {
        try {
            const existingBot = await this.database.findFirst({
                where: { id }
            });

            if (!existingBot) {
                Logs.error('database update', `O bot com o ID [ ${id} ] não existe`);
                return null;
            }

            const updatedBot = await this.database.update({
                where: { id },
                data: { ...data }
            });

            return updatedBot;
        } catch (error) {
            Logs.error('database update', `Erro ao atualizar o bot com o ID [ ${id} ]: ${error}`);
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const existingBot = await this.database.findFirst({
                where: { id }
            });

            if (!existingBot) {
                Logs.error('database delete', `O bot com o ID [ ${id} ] não existe`);
                return false;
            }

            await this.database.delete({
                where: { id }
            });

            return true;
        } catch (error) {
            Logs.error('database delete', `Erro ao deletar o bot com o ID [ ${id} ]: ${error}`);
            return false;
        }
    }
}

export default BotModel;
