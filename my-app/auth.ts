import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import AuthorizeUser from "./app/actions/authorizeUserAction"
import z from 'zod'

const signInSchema = z.object({
    email: z.string({ required_error: "Por favor, informe seu e-mail." })
      .min(1, "Por favor, informe seu e-mail.")
      .email("O e-mail informado não é válido."),
  
    password: z.string({ required_error: "Por favor, informe sua senha." })
      .min(1, "Por favor, informe sua senha.")
      .min(8, "A senha deve conter no mínimo 8 caracteres.")
      .max(32, "A senha deve conter no máximo 32 caracteres.")
});


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers:[
    Credentials({
      credentials: {
        email: {type:'email'},
        password: {type:'password'},
      },

      authorize: async (credentials) => {        
        const check = await signInSchema.safeParse(credentials)

        if(!check.success) return null        

        return await AuthorizeUser({...check.data})        
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 6 * 60 * 60 },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;  
        token.role = user.role;
        token.expires = Math.floor(Date.now() / 1000) + 6 * 60 * 60;        
      }
  
      if (Date.now() / 1000 > token.expires) {
        console.log("Token expirado, removendo sessão...");
        return null; 
      }
      return token;
    },
    
    async session({ session, token }: any) {
      if (Object.keys(token).length === 0) {
        return null;
      }
  
      if (!session.user) {
        session.user = null;
      }
      session.user.id = token.id;
      session.user.role = token.role;
  
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/"
  },

  secret: process.env.NEXTAUTH_SECRET
})