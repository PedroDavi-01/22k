import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // 👈 Importando as configurações que você moveu

const handler = NextAuth(authOptions);

// Exportamos o handler para os métodos GET e POST que o NextAuth utiliza
export { handler as GET, handler as POST };