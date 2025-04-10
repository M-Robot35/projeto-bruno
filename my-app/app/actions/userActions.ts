'use server'
import { auth } from "@/auth"
import userModel,{user} from "../database/db-model/user-model"


export async function getUserAction():Promise<user>{
   const session = await auth()
   const getUserId= await userModel.findById(session!.user.id)
   return getUserId as user    
}