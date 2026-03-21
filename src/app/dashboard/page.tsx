
import { CarouselComp } from "@/components/carousel";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EditProductDialog } from "@/components/edit-product-dialog";
import { DeleteProductAlert } from "@/components/delete-product-alert";
import { AddProductSheet } from "@/components/add-product-sheet";
import { BuyButton } from "@/components/buy-button"; 

import slideImage from "@/assets/images/slide-login.png";
import Image from "next/image";
import React from "react";

// Importamos a conexão com o banco e a action de deletar
import { prisma } from "@/lib/prisma"; 
import { deleteProductAction } from "@/app/actions/product-actions";

export default async function Dashboard() {
  // BUSCA DO BANCO DE DADOS (Executa no Servidor)
  const produtos = await prisma.product.findMany({
    orderBy: { id: 'desc' } // Os novos aparecem primeiro
  });

  return (
    <div className="bg-gray-100 w-full min-h-screen font-sans">
      <Header />

      <main className="w-full flex flex-col items-center px-4 md:px-10 py-6 gap-12">
        <CarouselComp />

        <section className="w-full max-w-7xl">
          <div className="p-4 md:p-8">
            
            {/* Título e Botão de Adicionar */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Catálogo de Produtos</h1>
              <AddProductSheet />
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {produtos.map((product) => (
                <div key={product.id} className=" cursor pointer! bg-white border border-gray-200 rounded-xl p-3 flex flex-col shadow-sm  transition-shadow">
                  
                  {/* Imagem do Produto */}
                  <div className="relative aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <Image 
                      src={product.image || slideImage} 
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110" 
                    />
                  </div>
                  

                  {/* Informações: Nome e Preço (Refinado com base na referência) */}
<div className="flex flex-col mb-4 px-1 gap-1">
  
  {/* NOME DO PRODUTO: Em negrito, caixa alta, cinza escuro e truncado */}
  <h3 className="text-[18px]! font-bold text-gray-700 truncate uppercase tracking-tight leading-tight" title={product.name}>
    {product.name}
  </h3>
  
  {/* PREÇO: Mais leve, cinza médio e tamanho normal */}
  <p className="text-gray-500 font-normal text-[15px]">
    A partir de R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  </p>
</div>

                  {/* Ações do Card */}
                  <div className="mt-auto flex flex-col gap-2">
                    
                    {/* Botão de Compra (Client Component com lógica do Zustand) */}
                    <BuyButton product={{
                      id: String(product.id),
                      name: product.name,
                      price: Number(product.price),
                      image: product.image
                    }} />
                    
                    {/* Botões de Edição e Exclusão */}
                    <div className="flex gap-2">
                      <EditProductDialog product={{
                        ...product, 
                        id: String(product.id), 
                        price: String(product.price)
                      }} />
                      
                      <DeleteProductAlert 
                        productName={product.name} 
                        onConfirm={async () => {
                          "use server"
                          await deleteProductAction(product.id);
                        }} 
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Estado Vazio */}
              {produtos.length === 0 && (
                <div className="col-span-full flex flex-col items-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium text-lg">
                    Nenhum produto encontrado no estoque.
                  </p>
                  <p className="text-sm text-gray-400">Comece adicionando um novo item acima.</p>
                </div>
              )}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}