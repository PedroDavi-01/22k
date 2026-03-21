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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-card shadow-xl border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                  Create your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Confirm password</FieldLabel>
                <Input id="confirmPassword" type="password" required />
              </Field>

              <Button type="submit" className="w-full cursor-pointer font-semibold rounded">
                Create
              </Button>



              <FieldDescription className="text-center text-xs mt-2">
                Do you have an account? <a href="/login" className="font-semibold underline">Login</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* LADO DA IMAGEM */}
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

      <p className="text-center text-[10px] text-muted-foreground px-8">
        If you continue, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </div>
  )
}