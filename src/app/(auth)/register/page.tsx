'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/lib/zod';
import { signUp } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const result = await signUp(data);
    if (result.success) {
      router.push('/login');
      alert("Cadastro realizado com sucesso!");
    } else {
      alert(result.error || "Erro ao cadastrar");
    }
  };

  return (
    // <--- Ajuste: min-h-screen e flex para centralizar na tela se necessário
    <div className="flex min-h-screen items-center justify-center bg-white px-4"> 
      <div className="max-w-md w-full p-8 bg-gray-900 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Criar Conta</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Campo de Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Nome</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Seu nome completo"
              // <--- Estilização: Borda sutil, fundo escuro sólido e foco destacado
              className={`p-2.5 rounded-md bg-gray-800 border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all`}
            />
            {errors.name && (
              <span className="text-xs text-red-400 mt-1">{errors.name.message}</span>
            )}
          </div>

          {/* Campo de E-mail */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">E-mail</label>
            <input
              {...register("email")}
              type="email"
              placeholder="exemplo@email.com"
              className={`p-2.5 rounded-md bg-gray-800 border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all`}
            />
            {errors.email && (
              <span className="text-xs text-red-400 mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* Campo de Senha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Senha</label>
            <input
              {...register("password")}
              type="password"
              placeholder="No mínimo 8 caracteres"
              className={`p-2.5 rounded-md bg-gray-800 border ${
                errors.password ? 'border-red-500' : 'border-gray-700'
              } text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all`}
            />
            {errors.password && (
              <span className="text-xs text-red-400 mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Botão de Envio */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 p-3 rounded-md text-white font-bold transition-colors shadow-lg mt-2"
          >
            {isSubmitting ? "Cadastrando..." : "Criar Conta"}
          </button>

          {/* Link para Login */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Já tem uma conta?{' '}
            <button 
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline"
            >
              Faça login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}