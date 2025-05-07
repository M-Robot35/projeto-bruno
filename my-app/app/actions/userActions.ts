'use server'
import { auth } from "@/auth"
import userModel,{user} from "../database/db-model/user-model"
import { redirect } from 'next/navigation'


export async function getUserAction():Promise<user>{
   const session = await auth()
   if(!session){
      await redirect('/auth/login')
      return
   }
   const getUserId= await userModel.findById(session!.user.id)
   return getUserId as user    
}

export async function getAllUserServerAction():Promise<user[]>{
   const allUser= await userModel.all()
   return allUser
}

export async function setUserUpdateAction(userId:string,data:Partial<user>):Promise<boolean>{
   try{
      const setUser= await userModel.update(userId, data)
      if(!setUser) return false
      return true

   }  catch(error){
      return false
   } 
}

export async function deleteUserAction(userId:string):Promise<boolean>{
   try{
      const setUser= await userModel.delete(userId)
      if(!setUser) return false
      return true
      
   }  catch(error){
      return false
   } 
}