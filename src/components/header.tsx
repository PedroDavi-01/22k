"use client"

import { useState, useEffect } from "react"
import { Mail, MessageCircleMore, Bell, ShoppingCart, Trash2, ThumbsDown, ArrowUpRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/useCartStore"
import Image from "next/image"

// IMPORTAÇÃO DO SEU CHECKOUT (Ajustada para a pasta components)
import { CheckoutModal } from "@/components/checkout"

export function Header() {
  const { items, removeItem, total } = useCartStore()
  const [mounted, setMounted] = useState(false)

  // Corrige o erro de "cascading renders" e Hydration
  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  if (!mounted) return null

  return (
    <header className="w-full h-18 bg-white border-b border-gray-300 flex items-center">
      <div className="w-full flex justify-between items-center px-8 md:px-20">
        
        {/* LOGO / MAIL ICON */}
        <div className="flex items-center gap-2">
          <Mail size={27} className="text-gray-700" />
        </div>

        <nav className="flex items-center gap-6">
          
          {/* CHAT */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="group flex items-center gap-2 text-black no-underline! hover:text-blue-600! transition-all font-medium bg-transparent border-none cursor-pointer outline-none!">
                <MessageCircleMore size={20} className="group-hover:text-blue-600! transition-colors"/>
                <span>Chat</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader className="bg-[#212529] p-6 h-20 flex flex-row items-center justify-between">
                <SheetTitle className="text-white! font-bold text-[22px]! tracking-tight mt-0!">Chat</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto mt-2 space-y-4 pb-30 px-4">
                <div className="flex items-center justify-between border-b border-gray-400 pb-3">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-14 bg-gray-200 rounded-md"></div>
                    <div>
                      <p className="font-medium mb-1">Suporte</p>
                      <p className="text-sm text-gray-500">Nosso serviço especializado</p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* NOTIFICAÇÕES */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="group flex items-center gap-2 text-black no-underline! hover:text-blue-600! transition-all font-medium bg-transparent border-none cursor-pointer outline-none!">
                <Bell size={20} className="group-hover:text-blue-600! transition-colors"/>
                <span>Notificações</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader className="bg-[#212529] p-6 h-20 flex flex-row items-center justify-between">
                <SheetTitle className="text-white! font-bold text-[22px]! tracking-tight mt-0!">Notificações</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {/* CARRINHO */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="group relative flex items-center gap-2 text-black no-underline! hover:text-blue-600! transition-all font-medium bg-transparent border-none cursor-pointer outline-none!">
                <ShoppingCart size={20} className="group-hover:text-blue-600! transition-colors"/>
                <span>Carrinho</span>
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {items.length}
                  </span>
                )}
              </button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader className="bg-[#212529] p-6 h-20 flex flex-row items-center justify-between">
                <SheetTitle className="text-white! font-bold text-[22px]! tracking-tight mt-0!">Meu Carrinho</SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto mt-2 space-y-4 pb-40 px-4">
                {items.length === 0 ? (
                  <p className="text-gray-500 mt-4 italic">Seu carrinho está vazio.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-400 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-md relative overflow-hidden">
                           {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                        </div>
                        <div>
                          <p className="font-medium mb-1 uppercase text-sm tracking-tight">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={18} className="text-gray-600 hover:text-red-600" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <SheetFooter className="absolute bottom-0 left-0 w-full p-6 bg-white border-t">
                <div className="w-full space-y-4">
                  <div className="flex justify-between font-bold text-lg text-black">
                    <span>Total:</span>
                    <span>R$ {total().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {/* CHAMADA DO SEU COMPONENTE DE CHECKOUT MODAL */}
                  <CheckoutModal />
                  
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

        </nav>
      </div>
    </header>
  )
}