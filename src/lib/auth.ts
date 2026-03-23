import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email"; // 🪄 Novo import
import { Resend } from "resend"; // 📧 Novo import
import argon2 from "argon2";
import { NextAuthOptions } from "next-auth";





































































const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // 1. Provedor de Magic Link (Resend)
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        const { error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // ⚠️ Altere para seu domínio quando homologar
          to: email,
          subject: 'Login na Loja de Motos 🏍️',
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h2>Olá!</h2>
              <p>Clique no botão abaixo para entrar na sua conta:</p>
              <a href="${url}" style="background: #6366f1; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">
                Entrar agora
              </a>
              <p>Se você não solicitou este e-mail, pode ignorá-lo.</p>
            </div>
          `,
        });

        if (error) {
          throw new Error("Falha ao enviar e-mail de verificação.");
        }
      },
    }),

    // 2. Seu CredentialsProvider atual (Senha)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        const isValid = await argon2.verify(user.password, credentials.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, 
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};