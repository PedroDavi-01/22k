"use client"

import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogClose, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Lock } from "lucide-react"

export function CheckoutModal() {
  // Gera os próximos 10 anos a partir do ano atual (2026)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors uppercase">
          Finalizar Compra
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#121212] text-white border border-gray-800 p-8 max-w-[450px] sm:rounded-lg">
        {/* Botão de Fechar Reforçado*/}

        <div className="space-y-6">
          <div className="space-y-1">
            {/* Título e Descrição para Acessibilidade */}
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Payment
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-400 flex items-center gap-2">
              <Lock size={12} /> All transactions are secure and encrypted.
            </DialogDescription>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Nome no Cartão */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Card name
              </Label>
              <Input
                id="name"
                placeholder="Ex: JOÃO SILVA"
                className="bg-[#1e1e1e] border-gray-700 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-gray-600 h-10 transition-all uppercase"
              />
            </div>

            {/* Número do Cartão e CVV */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="card-number" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Card number
                </Label>
                <Input
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  className="bg-[#1e1e1e] border-gray-700 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-gray-600 h-10 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  maxLength={4}
                  placeholder="123"
                  className="bg-[#1e1e1e] border-gray-700 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-gray-600 h-10 transition-all"
                />
              </div>
            </div>

            {/* Validade: Mês e Ano */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Month</Label>
                <Select>
                  <SelectTrigger className="bg-[#1e1e1e] border-gray-700 text-white h-12 focus:ring-1 focus:ring-white rounded">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e1e1e] text-white border-gray-700">
                    {Array.from({ length: 12 }, (_, i) => {
                      const m = (i + 1).toString().padStart(2, '0');
                      return <SelectItem key={m} value={m}>{m}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Year</Label>
                <Select>
                  <SelectTrigger className="bg-[#1e1e1e] border-gray-700 text-white h-12 focus:ring-1 focus:ring-white rounded">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e1e1e] text-white border-gray-700">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white hover:bg-gray-200 text-black font-extrabold py-3 rounded text-lg mt-4 transition-all active:scale-[0.98] uppercase"
            >
              Pay now
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}