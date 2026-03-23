"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import slideImage from "@/assets/images/slide-forms.png"
import { useState } from "react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if (password !== confirmPassword) {
      alert("As senhas não coincidem")
      setLoading(false)
      return
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    setLoading(false)

    if (res.ok) {
      alert("Conta criada com sucesso!")
      window.location.href = "/login"
    } else {
      alert(data.error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-card shadow-xl border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleRegister} className="p-6 md:p-8">
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                  Create your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email" id="email" type="email" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input name="password" id="password" type="password" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                <Input name="confirmPassword" id="confirmPassword" type="password" required />
              </Field>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create"}
              </Button>

              <FieldDescription className="text-center text-xs mt-2">
                Do you have an account?{" "}
                <a href="/login" className="font-semibold underline">
                  Login
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden md:block w-full h-full min-h-[400px]">
            <Image
              src={slideImage}
              alt="Register Image"
              fill
              className="object-cover absolute inset-0"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}