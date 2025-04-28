// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"

type RoleType = 'ADMIN' | 'SUPER_ADMIN' | 'USER'

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      role: RoleType
      name: string
      email: string
      image: string
    }
  }

  interface User extends DefaultUser {
    id: string
    role: RoleType
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    role: RoleType
    picture?: string
    name?: string | null
    expires: number
  }
}
