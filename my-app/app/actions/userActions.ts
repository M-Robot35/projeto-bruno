'use server'
import { auth } from "@/auth"
import userModel,{user} from "../database/db-model/user-model"


export async function getUserAction():Promise<user>{
   const session = await auth()
   const getUserId= await userModel.findById(session!.user.id)
   return getUserId as user    
}

export async function getAllUserServerAction():Promise<user[]>{
   const allUser= await userModel.all()
   return allUser
}

export async function setUserUpdateAction(userId:string,data:Partial<user>){
   const setUser= await userModel.update(userId, data)   
}