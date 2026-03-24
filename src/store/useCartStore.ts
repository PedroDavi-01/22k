import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from "sonner"

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
  ownerId: string
}

interface CartState {
  items: CartItem[]
  userId: string | null
  setUserId: (id: string | null) => void
  addItem: (item: Omit<CartItem, "quantity" | "ownerId">) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: () => number
  getUserItems: () => CartItem[]
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      userId: null,

      setUserId: (id) => set({ userId: id }),

      getUserItems: () => {
        const { items, userId } = get()
        return items.filter(item => item.ownerId === (userId || 'guest'))
      },

      addItem: (item) => {
        const { userId, items } = get()
        const currentOwner = userId || 'guest'
        const existingItem = items.find((i) => i.id === item.id && i.ownerId === currentOwner)

        if (existingItem) {
          set({
            items: items.map((i) =>
              (i.id === item.id && i.ownerId === currentOwner) 
                ? { ...i, quantity: i.quantity + 1 } 
                : i
            ),
          })
          toast.success(`Mais um ${item.name} adicionado!`)
        } else {
          set({ items: [...items, { ...item, quantity: 1, ownerId: currentOwner }] })
          toast.success(`${item.name} adicionado ao carrinho`)
        }
      },

      removeItem: (id) => {
        const { userId, items } = get()
        const currentOwner = userId || 'guest'
        const target = items.find(i => i.id === id && i.ownerId === currentOwner)

        if (target && target.quantity > 1) {
          set({
            items: items.map((i) =>
              (i.id === id && i.ownerId === currentOwner) ? { ...i, quantity: i.quantity - 1 } : i
            ),
          })
        } else {
          set({ items: items.filter((i) => !(i.id === id && i.ownerId === currentOwner)) })
        }
        toast.error("Item removido")
      },

      clearCart: () => {
        const { userId, items } = get()
        const currentOwner = userId || 'guest'
        set({ items: items.filter(i => i.ownerId !== currentOwner) })
      },

      total: () => {
        return get().getUserItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
      },
    }),
    {
      name: 'magazine-pedro-v1',
    }
  )
)