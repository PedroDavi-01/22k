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
import { Mail } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const email = formData.get("email")
    const password = formData.get("password")

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (data.token) {
      localStorage.setItem("token", data.token)
      window.location.href = "/dashboard"
    } else {
      alert(data.error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-card shadow-xl border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold">Welcome back</h1>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email" id="email" type="email" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input name="password" id="password" type="password" required />
              </Field>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <FieldDescription className="text-center text-xs mt-2">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline">
                  Sign up
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden md:block w-full h-full min-h-[400px]">
            <Image
              src={slideImage}
              alt="Login Image"
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