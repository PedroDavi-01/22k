"use server"

import { prisma } from "@/lib/prisma" // Importado como prisma
import { revalidatePath } from "next/cache"
import { writeFile, unlink, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// 1. CRIAR PRODUTO
export async function createProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const priceRaw = formData.get("price") as string
    const imageFile = formData.get("image") as File | null

    if (!name || !priceRaw) {
      return { success: false, error: "Nome e preço são obrigatórios." }
    }

    // Converte o preço limpando a string
    const price = parseFloat(priceRaw.replace(/\./g, '').replace(',', '.'))

    if (isNaN(price)) {
      return { success: false, error: "Preço inválido." }
    }

    let imageUrl = "/placeholder.png"

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // GARANTE QUE A PASTA EXISTE
      const uploadDir = join(process.cwd(), "public", "update")
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, "_")}`
      const path = join(uploadDir, fileName)
      
      await writeFile(path, buffer)
      imageUrl = `/update/${fileName}`
    }

    // CORREÇÃO: Usando 'prisma' em vez de 'db'
    await prisma.product.create({
      data: { 
        name, 
        price, 
        image: imageUrl 
      }
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("ERRO NO SERVIDOR (CREATE):", error)
    return { success: false, error: error.message || "Erro interno no servidor" }
  }
}

// 2. EXCLUIR PRODUTO
export async function deleteProductAction(id: string) {
  try {
    // CORREÇÃO: Usando 'prisma' em vez de 'db'
    const product = await prisma.product.findUnique({ where: { id } })
    
    if (product?.image && product.image.startsWith("/update/")) {
      const fullPath = join(process.cwd(), "public", product.image)
      await unlink(fullPath).catch(() => console.log("Imagem não encontrada no disco"))
    }

    await prisma.product.delete({ where: { id } })
    
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("ERRO AO EXCLUIR:", error)
    return { success: false, error: error.message }
  }
}

// 3. EDITAR PRODUTO
export async function updateProductAction(id: string, data: { name: string, price: string }) {
  try {
    const price = parseFloat(data.price.replace(/\./g, '').replace(',', '.'))
    
    // CORREÇÃO: Usando 'prisma' em vez de 'db'
    await prisma.product.update({
      where: { id },
      data: { 
        name: data.name, 
        price: price 
      }
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("ERRO AO EDITAR:", error)
    return { success: false, error: error.message }
  }
}