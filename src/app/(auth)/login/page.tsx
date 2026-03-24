"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import slideImage from "@/assets/images/slide-forms.png"
import { Mail, Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState, useRef } from "react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // 1. Login com Senha (Credentials)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      toast.error("Email ou senha inválidos", {
        description: "Verifique suas credenciais e tente novamente."
      })
      setLoading(false)
    } else {
      toast.success("Login realizado!", {
        description: "Bem-vindo de volta, carregando seu painel..."
      })
      router.push("/dashboard")
      router.refresh()
    }
  }

  // 2. Login com Link Mágico
  const handleMagicLink = async () => {
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const email = formData.get("email")

    if (!email) {
      toast.warning("E-mail necessário", {
        description: "Por favor, digite seu e-mail para receber o link de acesso."
      })
      return
    }

    setEmailLoading(true)
    try {
      const result = await signIn("email", { 
        email, 
        redirect: false,
        callbackUrl: "/dashboard" 
      })

      if (result?.ok && !result.error) {
        toast.success("Verifique sua caixa de entrada!", {
          description: "Enviamos um link de acesso para o seu e-mail.",
          duration: 5000,
        })
      } else {
        toast.error("Erro ao enviar e-mail", {
          description: "Verifique se o serviço de e-mail (Resend) está configurado."
        })
      }
    } catch (error) {
      toast.error("Erro inesperado", {
        description: "Não foi possível enviar o link no momento."
      })
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100 p-6">
      <div className="w-full max-w-[750px] flex flex-col gap-4">
        <Card className="overflow-hidden p-0 bg-white shadow-2xl border-none rounded-xl">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form ref={formRef} className="p-6 md:p-10" onSubmit={handleSubmit}>
              <FieldGroup className="gap-3">
                <div className="flex flex-col items-center gap-1 text-center mb-4">
                  <h1 className="text-xl font-bold tracking-tight text-zinc-900">Welcome back</h1>
                  <p className="text-xs text-muted-foreground">Login to your account</p>
                </div>

                <Field>
                  <FieldLabel htmlFor="email" className="text-xs font-semibold">Email</FieldLabel>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required className="h-9 text-sm border-zinc-200" />
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password" className="text-xs font-semibold">Password</FieldLabel>
                  </div>
                  <Input id="password" name="password" type="password" required className="h-9 text-sm border-zinc-200" />
                </Field>

                <Button type="submit" disabled={loading || emailLoading} className="w-full font-bold rounded h-9 text-sm bg-zinc-900 text-white hover:bg-zinc-800 mt-2 transition-colors">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
                </Button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-zinc-100"></div>
                  <span className="mx-2 flex-shrink text-[9px] font-bold uppercase tracking-widest text-zinc-400">Or</span>
                  <div className="flex-grow border-t border-zinc-100"></div>
                </div>

                <Button 
                  type="button"
                  onClick={handleMagicLink}
                  disabled={loading || emailLoading}
                  variant="secondary" 
                  className="w-full bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center gap-2 h-9 rounded"
                >
                  {emailLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span className="text-xs font-medium">Login with email</span>
                      <Mail size={14} />
                    </>
                  )}
                </Button>

                <FieldDescription className="text-center text-[11px] mt-2">
                  Don&apos;t have an account? <a href="/register" className="font-semibold underline">Sign up</a>
                </FieldDescription>
              </FieldGroup>
            </form>

            <div className="relative hidden md:block w-full h-full min-h-[350px]">
              <Image src={slideImage} alt="Login Image" fill className="object-cover" priority />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}