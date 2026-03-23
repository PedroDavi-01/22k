import { z } from "zod"

// O Schema que a Action usa para validar
export const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
})

// O Tipo que o React Hook Form usa (O "RegisterInput" que você sentiu falta)
export type RegisterInput = z.infer<typeof registerSchema>