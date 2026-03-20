// REMOVEMOS o "use client" daqui para ele ser um Server Component
import { CarouselComp } from "@/components/carousel";
import { Header } from "@/components/header";
import slideImage from "@/assets/images/slide-login.png";
import Image from "next/image";
import React from "react";
import { Footer } from "@/components/footer";

import { EditProductDialog } from "@/components/edit-product-dialog";
import { DeleteProductAlert } from "@/components/delete-product-alert";
import { AddProductSheet } from "@/components/add-product-sheet";

// Importamos a conexão com o banco e a action de deletar
import { prisma } from "@/lib/prisma"; 
import { deleteProductAction } from "@/app/actions/product-actions";

export default async function Dashboard() {
  // BUSCA REAL DO BANCO DE DADOS
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
            
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Catálogo de Produtos</h1>
              <AddProductSheet />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {produtos.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  
                  <div className="relative aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <Image 
                      // Se o produto tiver imagem no banco, usa ela, senão usa o slideImage
                      src={product.image || slideImage} 
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110" 
                    />
                  </div>
                  
                  <div className="flex flex-col mb-4">
                    <h3 className="text-xs font-bold text-gray-700 truncate">{product.name}</h3>
                    <p className="text-gray-900 font-extrabold text-lg">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <button className="w-full bg-[#e60000] hover:bg-[#cc0000] text-white py-2 rounded text-sm font-bold transition-colors cursor-pointer shadow-sm">
                      Comprar
                    </button>
                    
                    <div className="flex gap-2">
                      {/* Passamos o produto do banco para o Dialog */}
                      <EditProductDialog product={{
                        ...product, 
                        id: String(product.id), 
                        price: String(product.price)
                      }} />
                      
                      {/* Chamamos a Action do servidor diretamente no Confirm */}
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

              {produtos.length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-10">
                  Nenhum produto cadastrado.
                </p>
              )}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}