import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Cria a conexão nativa usando a URL do seu .env
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Cria o adaptador que o Prisma 7 exige
const adapter = new PrismaPg(pool);

// 3. Passa o adaptador no construtor. 
// Isso resolve o erro de "non-empty options" e o erro de tipagem.
export const prisma = new PrismaClient({ adapter });