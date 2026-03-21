import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define o formato de um item dentro do carrinho
export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
}

// Define TUDO o que a nossa "loja" (store) consegue fazer e armazenar
interface CartState {
  items: CartItem[] // Lista de produtos no carrinho
  addItem: (item: CartItem) => void // Função para adicionar
  removeItem: (id: string) => void // Função para remover um item específico
  clearCart: () => void // Limpa o carrinho todo
  total: () => number // Função que calcula a soma dos preços
}

export const useCartStore = create<CartState>()(
  // O persist salva os dados no navegador (localStorage) para não sumir no F5
  persist(
    (set, get) => ({
      items: [], // Começamos com o carrinho vazio

      // Adiciona um novo item mantendo os que já estavam lá (usando o ...state.items)
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),

      // Filtra a lista e remove apenas o item que tem o ID passado
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter((i) => i.id !== id) 
      })),

      // Reseta o array de itens para vazio
      clearCart: () => set({ items: [] }),

      // get() acessa o estado atual para somar os preços usando o .reduce()
      total: () => get().items.reduce((acc, item) => acc + item.price, 0),
    }),
    { 
      name: 'cart-storage' // Nome da "chave" que aparecerá no LocalStorage do navegador
    }
  )
)