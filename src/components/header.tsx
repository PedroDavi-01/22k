

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

export function Header() {
  return (
          <header className="w-full h-18 bg-white border-b border-gray-300 flex items-center">
        
        <div className="w-full flex justify-between items-center px-8 md:px-20">
          
          {/** Parte direita - logo */}
          <div className="flex items-center gap-2">
            <Mail size={27} className="text-gray-700" />
          </div>

          {/**Parte esquerda - links */}

          <nav className="flex items-center gap-6">
            
            {/* CHAT */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="group flex items-center gap-2 text-black no-underline! hover:text-blue-600! transition-all font-medium bg-transparent border-none cursor-pointer">
                  <MessageCircleMore size={20} className="group-hover:text-blue-600! transition-colors"/>
                  <span>Chat</span>
                </button>
              </SheetTrigger>
              
              {/* Lado que o menu abre (side="right") */}
              <SheetContent side="right" className="w-[400px] sm:w-[540px] data-[state=open]:animate-in! data-[state=open]:slide-in-from-right! duration-300!">
                <SheetHeader className="bg-[#212529] p-6 h-20 flex flex-row items-center justify-between">
                  <SheetTitle className="text-white! font-bold text-[22px]!   tracking-tight mt-0!">Chat</SheetTitle>
                </SheetHeader>

                {/* Exemplo de recepetores */}
               <div className="flex-1 overflow-y-auto mt-2 space-y-4 pb-30">

                  <div className="flex items-center justify-between border-b border-gray-400 pb-3 px-4">

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-14 bg-gray-200 rounded-md"></div>
                      <div>
                        <p className="font-medium mb-1">Suporte</p>
                        <p className="text-sm text-gray-500 mb-1">Nosso serviço especializado em resolver seus problemas</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded border-gray-900!">
                        <MessageCircleMore size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="border! border-red-600! rounded ">
                       <ThumbsDown size={16} className="text-red-600" />
                    </Button>
                    </div>

                  </div>
                  <div className="flex items-center justify-between border-b border-gray-400 pb-3 px-4">

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                      <div>
                        <p className="font-medium mb-1">Maxine Eletro</p>
                        <p className="text-sm text-gray-500 mb-1">Empresa lider na venda de eletrodomesticos</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded border-gray-900!">
                        <MessageCircleMore size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="border! border-red-600! rounded ">
                       <ThumbsDown size={16} className="text-red-600" />
                    </Button>
                    </div>

                  </div>
                  
                </div>


              </SheetContent>
            </Sheet>

            {/* NOTIFICAÇÕES */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="group flex items-center gap-2 text-black no-underline! hover:text-blue-600! transition-all font-medium bg-transparent border-none cursor-pointer">
                  <Bell size={20} className="group-hover:text-blue-600! transition-colors"/>
                  <span>Notificações</span>
                </button>
              </SheetTrigger>
              
              {/* Lado que o menu abre (side="right") */}
              <SheetContent side="right" className="w-[400px] sm:w-[540px] data-[state=open]:animate-in! data-[state=open]:slide-in-from-right! duration-300!">
                <SheetHeader className="bg-[#212529] p-6 h-20 flex flex-row items-center justify-between">
                  <SheetTitle className="text-white! font-bold text-[22px]!   tracking-tight mt-0!">Notificações</SheetTitle>
                </SheetHeader>

                {/* Exemplo de notificação */}
                <div className="flex-1 overflow-y-auto mt-2 space-y-4 pb-30">

                  <div className="flex items-center justify-between border-b border-gray-400 pb-3 px-4">

                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
                      <div>
                        <p className="font-medium mb-1">Capacete Vintage</p>
                        <p className="text-sm text-gray-500 mb-1"> De R$ 299,90 por apenas R$ 259,90</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded border-gray-900!">
                        <ArrowUpRight size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="border! border-red-600! rounded ">
                       <ThumbsDown size={16} className="text-red-600" />
                    </Button>
                    </div>

                  </div>
                  
                </div>


              </SheetContent>
            </Sheet>

            {/* CARRINHO */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="group flex items-center gap-2 text-black no-underline! hover:text-blue-600! transition-all font-medium bg-transparent border-none cursor-pointer">
                  <ShoppingCart size={20} className="group-hover:text-blue-600! transition-colors"/>
                  <span>Carrinho</span>
                </button>
              </SheetTrigger>
              
              {/* Lado que o menu abre (side="right") */}
              <SheetContent side="right" className="w-[400px] sm:w-[540px] data-[state=open]:animate-in! data-[state=open]:slide-in-from-right! duration-300!">
                <SheetHeader className="bg-[#212529] p-6 h-20 flex flex-row items-center justify-between">
                  <SheetTitle className="text-white! font-bold text-[22px]!   tracking-tight mt-0!">Meu Carrinho</SheetTitle>
                </SheetHeader>

                {/* Exemplo de item no carrinho */}
                <div className="flex-1 overflow-y-auto mt-2 space-y-4 pb-30">

                  <div className="flex items-center justify-between border-b border-gray-400 pb-4 px-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
                      <div>
                        <p className="font-medium mb-1">Capacete Vintage</p>
                        <p className="text-sm text-gray-500 mb-1">R$ 299,90</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="border-gray-900! rounded">
                      <Trash2 size={18} />
                    </Button>
                  </div>

                </div>

                <SheetFooter className="absolute bottom-0 left-0 w-full p-6 bg-white border-t">
                  <div className="w-full space-y-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>R$ 299,90</span>
                    </div>
                    <Button className="w-full bg-red-600! hover:bg-red-700! rounded">
                      Finalizar Compra
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

          </nav>
        </div>
      </header>
  )
}