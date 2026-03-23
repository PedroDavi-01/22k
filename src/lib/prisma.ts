import { PrismaClient } from "@prisma/client"; // O tsconfig já aponta para a pasta certa
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Configuração do Pool de conexão nativa
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Criar o adaptador para o Prisma
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};


// Inicialização com o adaptador para resolver o erro de "0 argumentos"
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;