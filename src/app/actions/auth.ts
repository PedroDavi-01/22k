'use server' // 🔒 Segurança: Roda apenas no servidor

import prisma from "@/lib/prisma" // 🗄️ Nosso tradutor do banco de dados
import argon2 from "argon2" // 🔐 O mestre da criptografia
import { registerSchema } from "@/lib/zod" // 📝 Nosso contrato de validação

export async function signUp(data: unknown) {
  // Passo 1: Validação com Zod
  const result = registerSchema.safeParse(data);
  
  if (!result.success) {
    return { error: "Dados inválidos." };
  }

  const { email, password, name } = result.data;

  try {
    // Passo 2: Verificação de duplicidade
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return { error: "Este e-mail já está em uso." };
    }

    // Passo 3: Hashing da senha
    // Em vez de salvar "123456", salvamos algo como "$argon2id$v=19..."
    const hashedPassword = await argon2.hash(password);

    // Passo 4: Salvar no MySQL
    
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    // Log para o desenvolvedor e mensagem amigável para o usuário
    console.error(error);
    return { error: "Erro interno ao criar a conta." };
  }
}
