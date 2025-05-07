import { Schedule } from "@prisma/client";
import { prismaConnect } from "../db-connect";
import { Logs } from "@/app/core/logs";

type outputType = Schedule;

export type inputType = {
    id: string;
    botId: string;
    cron: string;
    isPaused: boolean;
};

export type ScheduleCreateType = Omit<inputType, 'id'>;

class ScheduleModel {
    private database;

    constructor() {
        this.database = prismaConnect.schedule;
    }

    async create(data: ScheduleCreateType): Promise<outputType | null> {
        const { botId } = data;

        const existingSchedule = await this.database.findFirst({
            where: { botId }
        });

        if (existingSchedule) {
            Logs.error('database create', `O agendamento para o bot [ ${data} ] já existe`);
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

    async findByBotId(botId: string): Promise<outputType | null> {
        try {
            const execute = await this.database.findFirst({
                where: { botId }
            });
            if (!execute) {
                Logs.error('database findByBotId', `O agendamento para o bot com o ID [ ${botId} ] não existe`);
                return null;
            }
            return execute;
        } catch (error) {
            Logs.error('database findByBotId', `Erro ao buscar o agendamento para o bot com o ID [ ${botId} ]: ${error}`);
            return null;
        }
    }
}

export default ScheduleModel;
