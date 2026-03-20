"use client"

import { useState, useRef } from "react"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, X, UploadCloud } from "lucide-react"
import Image from "next/image"

// Importação da Action que criamos
import { createProductAction } from "@/app/actions/product-actions"

export function AddProductSheet() {
  const [open, setOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // 1. Captura o formulário IMEDIATAMENTE
    const form = e.currentTarget 
    setIsPending(true)

    const formData = new FormData(form)
    
    try {
      const result = await createProductAction(formData)

if (result.success) {
  form.reset();         // 1. Limpa o formulário (ele ainda existe no DOM)
  setImagePreview(null); // 2. Tira a imagem
  setOpen(false);        // 3. Só agora mata o componente da tela
} else {
        alert("Erro ao salvar produto no banco. Verifique o terminal do VS Code.")
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
      alert("Erro crítico ao tentar cadastrar.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded flex items-center gap-2 cursor-pointer shadow-md transition-all">
          <Plus size={18} />
          <span>Criar produto</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-[400px] p-0 bg-white border-none flex flex-col data-[state=open]:animate-in! data-[state=open]:slide-in-from-right! duration-300! [&>button]:hidden" 
      >
        <SheetHeader className="bg-[#212529] space-y-0 px-6 py-4 flex-row items-center justify-between h-20">
          <SheetTitle className="text-white! font-bold text-[22px]! tracking-tight mt-0!">Adicionar produto</SheetTitle>
          <SheetClose className="text-gray-400 hover:text-white transition-colors outline-none cursor-pointer">
            <X size={20} />
          </SheetClose>
        </SheetHeader>

        <form onSubmit={handleAdd} className="flex flex-col flex-1 p-6 overflow-y-auto">
          <div className="space-y-6 flex-1">
            
            {/* SELEÇÃO DE IMAGEM */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">Imagem do Produto</Label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-xl h-48 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-indigo-400 transition-all overflow-hidden"
              >
                {imagePreview ? (
                  <>
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <p className="text-white text-xs font-bold">Trocar imagem</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <UploadCloud size={40} className="mb-2" />
                    <span className="text-xs font-medium">Clique para fazer upload</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </div>

            {/* NOME */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-gray-700">Nome do produto</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Ex: Jaqueta de Couro" 
                required 
                className="h-11 border-gray-200 focus:border-indigo-500 rounded-md shadow-sm" 
              />
            </div>

            {/* PREÇO */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-bold text-gray-700">Preço (R$)</Label>
              <Input 
                id="price" 
                name="price" 
                placeholder="0,00" 
                required 
                className="h-11 border-gray-200 focus:border-indigo-500 rounded-md shadow-sm" 
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-6">
            <Button 
              disabled={isPending}
              type="submit" 
              className="w-full h-12 bg-[#e60000]! hover:bg-[#cc0000]! text-white font-bold text-base rounded transition-all shadow-md cursor-pointer"
            >
              {isPending ? "Salvando..." : "Cadastrar Produto"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}