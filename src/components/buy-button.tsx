"use client"

import { useCartStore } from "@/store/useCartStore"

interface BuyButtonProps {
  product: {
    id: string
    name: string
    price: number
    image?: string | null
  }
}

export function BuyButton({ product }: BuyButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button 
      onClick={() => addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || undefined
      })}
      className="w-full bg-[#e60000] hover:bg-[#cc0000] text-white py-2 rounded text-sm font-bold transition-colors cursor-pointer shadow-sm active:scale-95"
    >
      Comprar
    </button>
  )
}