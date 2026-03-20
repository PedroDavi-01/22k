"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DeleteProductProps {
  productName: string
  onConfirm: () => Promise<void>
}

export function DeleteProductAlert({ productName, onConfirm }: DeleteProductProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault() 
    setIsDeleting(true)
    try {
      await onConfirm()
    } catch (error) {
      console.error("Erro ao excluir:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          className="flex-1 h-8 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-none cursor-pointer rounded transition-colors"
        >
          Excluir
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[400px] rounded-2xl p-6 bg-white border-none shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-gray-800 text-center leading-tight">
            Tem certeza sobre a exclusão de <span className="text-indigo-600">"{productName}"</span>?
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-6 flex flex-row items-center justify-center gap-3 sm:justify-center w-full">
          <AlertDialogCancel disabled={isDeleting} className="mt-0 flex-1 h-11 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold cursor-pointer transition-all">
            Cancelar
          </AlertDialogCancel>
          
          <Button 
            onClick={handleConfirm}
            disabled={isDeleting}
            className="mt-0 flex-1 h-11 rounded bg-red-600 hover:bg-red-700 text-white font-bold shadow-none border-none cursor-pointer transition-all"
          >
            {isDeleting ? "Excluindo..." : "Prosseguir"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}