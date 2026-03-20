import React from 'react';
// Usando Phosphor Icons no React Icons (não depreciado)
import { 
  PiFacebookLogo, 
  PiInstagramLogo, 
  PiXLogo, 
  PiGithubLogo, 
  PiYoutubeLogo 
} from "react-icons/pi";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // CORES EXATAS DA IMAGEM:
  // Fundo: #0c0f16 (Cinza-escuro-azulado profundo)
  // Borda: #1e2633 (Um tom mais claro para a borda superior)

  return (
    <footer className="w-full bg-[#0c0f16] border-t border-[#1e2633] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* LADO ESQUERDO: Texto de Copyright */}
        {/* Usando text-gray-500/80 para um visual mais sutil, próximo ao da imagem */}
        <p className="text-gray-500/80 text-sm order-2 md:order-1 font-normal">
          © {currentYear} 22K, Inc. All rights reserved.
        </p>

        {/* LADO DIREITO: Ícones de Redes Sociais */}
        <div className="flex items-center gap-6 order-1 md:order-2">
          {/* text-gray-400 para o estado normal e text-white no hover */}
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
            <PiFacebookLogo size={24} />
          </a>
          <a href="https://www.instagram.com/iampedrodavii/" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <PiInstagramLogo size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="X (Twitter)">
            <PiXLogo size={22} />
          </a>
          <a href="https://github.com/PedroDavi-01" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
            <PiGithubLogo size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
            <PiYoutubeLogo size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}