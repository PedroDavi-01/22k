import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// 1. Instancie o Pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
})

// 2. Tente esta conversão forçada (Double Casting)
// Isso mata qualquer validação de tipo que esteja travando o build
const adapter = new PrismaPg(pool as unknown as any) 

// 3. O restante do seu código global
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma