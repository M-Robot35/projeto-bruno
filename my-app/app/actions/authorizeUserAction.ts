'use server'
import bcriptHash from '../core/helpers/bcript'
import userModel,{user} from '../database/db-model/user-model'

type TypeAuthorizeUser={
    email:string
    password: string
}

export default async function AuthorizeUser(userData: TypeAuthorizeUser):Promise<user|null> {
    const {email, password}= userData
    
    try{
        const getUser= await userModel.findByEmail(email)    
        if (!getUser) return null

        const pwHash = await bcriptHash.compare(password, getUser.password) 

        if (!pwHash ) return null

        return getUser
    }catch(error){
        return null
    }
}