// import {  PrismaClient } from "@prisma/client";

// export const prismaConnect=  new PrismaClient()

// lib/db-connect.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prismaConnect =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaConnect
