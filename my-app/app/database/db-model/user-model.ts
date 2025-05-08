import { User } from "@prisma/client";
import { prismaConnect } from "../db-connect"
import { Logs } from "@/app/core/logs";
import { Env } from "@/app/core/system-config";

export type user= {
    id: string;
    name: string | null;
    emailVerified: Date | null;
    image: string | null;
    email: string;
    password: string;
    telefone: string | null;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
}

export type UserCreateType= Omit<user, 'id'|'name'|'emailVerified'|'image'|'telefone'|'role'>


class UserModel {
    private database;

    constructor(){
        this.database= prismaConnect.user
    }

    async create(data:UserCreateType): Promise<User|null> {   
        if( await this.findByEmail(data.email) ){
            Logs.error('database create', `o Email [ ${data.email} ] já existe`)
            return null
        }
        const execute= await this.database.create({
            data:{...data}
        })
        return execute
    }

    async findById(userId:string): Promise<User|null>
    {
        const execute= await this.database.findFirst({
            where: {
                id:userId
            }
        })
        return execute
    }

    async findByEmail(email:string): Promise<User|null>
    {
        const execute= await this.database.findFirst({
            where: {
                email
            }
        })
        
        if( !execute ){
            Logs.error('database findByEmail', `o Email [ ${email} ] Não existe`)
            return null
        }
        return execute
    }

    async all(): Promise<User[]>
    {   
        if(Env.SKIP_DB) return [] // passar para não atrapalhar a fazer a imagem docker

        const execute= await this.database.findMany()
        return execute
    }

    async update(userId:string, data:Partial<user>): Promise<User>
    {           
        const execute= await this.database.update({
            where: {
                id:userId
            },
            data
        })
        return execute
    }

    async delete(userId:string): Promise<User|null>
    {
        const execute= await this.database.delete({
            where: {
                id:userId
            }
        })
        return execute
    }    
}

export default new UserModel()