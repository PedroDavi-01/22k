"use client"

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { updateProductAction } from "@/app/actions/product-actions"

type Product = {
  id: string
  name: string
  price: string | number
}

interface EditProductProps {
  product: Product
}

export function EditProductDialog({ product }: EditProductProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const price = formData.get("price") as string

    try {
      const result = await updateProductAction(product.id, { name, price })
      
      if (result.success) {
        setOpen(false)
      } else {
        alert(result.error || "Falha ao atualizar o produto.")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 h-8 text-xs font-semibold bg-gray-50 text-gray-700 border-gray-200 cursor-pointer rounded hover:bg-gray-100 transition-colors">
          Editar
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[400px] rounded-xl bg-white border-none shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Editar produto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="font-semibold text-gray-700">Nome do produto</Label>
            <Input 
              id="name"
              name="name" 
              defaultValue={product.name} 
              required
              className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price" className="font-semibold text-gray-700">Preço (R$)</Label>
            <Input 
              id="price"
              name="price" 
              defaultValue={product.price.toString()} 
              required
              className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="flex-1 border border-gray-200 rounded font-medium hover:bg-gray-50">
                Cancelar
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold transition-all shadow-md"
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}