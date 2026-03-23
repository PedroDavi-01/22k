"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import slideImage from "@/assets/images/slide-forms.png"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { signUp } from "@/app/actions/auth" 

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData)

      if (data.password !== data.confirmPassword) {
        alert("As senhas não coincidem!")
        setLoading(false)
        return
      }

      const result = await signUp({
        name: (data.email as string).split('@')[0],
        email: data.email as string,
        password: data.password as string,
      })

      if (result.success) {
        alert("Conta criada com sucesso!")
        router.push("/login")
      } else {
        alert(result.error || "Erro ao criar conta")
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      alert("Erro inesperado")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100 p-6">
      <div className="w-full max-w-[750px] flex flex-col gap-4">
        <Card className="overflow-hidden p-0 bg-white shadow-2xl border-none rounded-xl">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-10" onSubmit={handleRegister}>
              <FieldGroup className="gap-3">
                <div className="flex flex-col items-center gap-1 text-center mb-4">
                  <h1 className="text-xl font-bold tracking-tight text-zinc-900">Create account</h1>
                  <p className="text-xs text-muted-foreground">Join us today</p>
                </div>

                <Field>
                  <FieldLabel htmlFor="email" className="text-xs font-semibold">Email</FieldLabel>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required className="h-9 text-sm border-zinc-200" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="text-xs font-semibold">Password</FieldLabel>
                  <Input id="password" name="password" type="password" required className="h-9 text-sm border-zinc-200" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword" className="text-xs font-semibold">Confirm Password</FieldLabel>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required className="h-9 text-sm border-zinc-200" />
                </Field>

                <Button type="submit" disabled={loading} className="w-full mt-2 font-bold rounded h-9 text-sm bg-zinc-900 text-white hover:bg-zinc-800 transition-all">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
                </Button>

                <FieldDescription className="text-center text-[11px] mt-2">
                  Already have an account? <a href="/login" className="font-semibold underline">Login</a>
                </FieldDescription>
              </FieldGroup>
            </form>

            <div className="relative hidden md:block w-full h-full min-h-[380px]">
              <Image src={slideImage} alt="Register" fill className="object-cover" priority />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}