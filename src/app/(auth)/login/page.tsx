"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou senha incorretos.");
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  // 1. Crie esta função dentro do seu componente LoginPage
  async function handleMagicLink(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Pegamos o valor do input de email manualmente através do FormData ou useRef
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const email = emailInput?.value;

    if (!email) {
      setError("Por favor, digite seu e-mail primeiro.");
      setLoading(false);
      return;
    }

    const result = await signIn("email", { 
      email, 
      redirect: false,
      callbackUrl: "/dashboard" 
    });

    setLoading(false);

    if (result?.error) {
      setError("Erro ao enviar o link. Tente novamente.");
    } else {
      alert("Verifique seu e-mail! Enviamos um link de acesso para você.");
    }
  }

  return (
    // <--- MODIFICAÇÃO: Garante que o fundo da página inteira seja branco
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white"> 
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <--- MODIFICAÇÃO: Texto em cinza escuro para contraste */}
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900"> 
          Entrar na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            // <--- MODIFICAÇÃO: Alertas mais visíveis em fundo claro
            <div className="p-3 rounded bg-red-100 border border-red-400 text-red-700 text-sm text-center"> 
              {error}
            </div>
          )}

          <div>
            {/* <--- MODIFICAÇÃO: Label em cinza escuro */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700"> 
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                // <--- MODIFICAÇÃO: Input com fundo claro (quase branco), borda sutil e texto escuro
                className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            {/* <--- MODIFICAÇÃO: Label em cinza escuro */}
            <label htmlFor="password" className="block text-sm font-medium text-gray-700"> 
              Senha
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                // <--- MODIFICAÇÃO: Input com fundo claro (quase branco), borda sutil e texto escuro
                className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? "Carregando..." : "Sign in"}
            </button>
          </div>

          {/* Divisor Visual (Opcional) */}
          <div className="relative flex py-2 items-center">
            {/* <--- MODIFICAÇÃO: Divisor mais visível em fundo claro */}
            <div className="flex-grow border-t border-gray-200"></div> 
            <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase">Ou</span>
            {/* <--- MODIFICAÇÃO: Divisor mais visível em fundo claro */}
            <div className="flex-grow border-t border-gray-200"></div> 
          </div>

          {/* Botão de Magic Link */}
          <div>
            <button
              onClick={handleMagicLink}
              type="button"
              disabled={loading}
              // <--- MODIFICAÇÃO: Botão secundário com borda visível e texto escuro
              className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50" 
            >
              Receber link por e-mail
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}