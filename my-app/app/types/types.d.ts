declare module "next-auth" {  
    
    interface User {
      name?:string,
      email:string,
      image?:string,
      role:string,
    }
   
    interface Account {}   
   
    interface Session {
      name?:string,
      email:string,
      image?:string,
      role:string,
    }
  }
   
  import { JWT } from "next-auth/jwt"
   
  declare module "next-auth/jwt" {
    
    interface JWT {
      /** OpenID ID Token */
      idToken?: string
    }
  }