import { Instagram, Youtube } from 'lucide-react';
import paymentImg from '../../imports/payment-method__2_-1.svg';
import logoImage from '../../imports/instapix-logo-full.svg';
import pixIcon from '../../imports/pix.svg';

interface FooterProps {
  onNavigate?: (slug: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const go = (slug: string) => onNavigate?.(slug);

  return (
    <footer className="bg-[#F5F5F5] border-t border-black/8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src={logoImage} alt="Instapix" className="h-[47px] w-auto" />
            </div>
            <p className="text-gray-600 text-sm mb-4">
              A melhor plataforma de cassino online do Brasil.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-[#58B0B1] transition-colors border border-black/15">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-[#58B0B1] transition-colors border border-black/15">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-black font-bold mb-4">AJUDA</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={() => go('central-de-ajuda')} className="hover:text-black transition-colors text-left text-xs">Central de Ajuda</button></li>
              <li><button onClick={() => go('fale-conosco')} className="hover:text-black transition-colors text-left text-xs">Fale Conosco</button></li>
              <li><button onClick={() => go('metodos-de-pagamento')} className="hover:text-black transition-colors text-left text-xs">Métodos de Pagamento</button></li>
              <li><button onClick={() => go('caca-niqueis-online')} className="hover:text-black transition-colors text-left text-xs">Caça-Níqueis Online</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-4">REGRAS</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={() => go('termos-condicoes')} className="hover:text-black transition-colors text-left text-xs">Termos e Condições</button></li>
              <li><button onClick={() => go('politica-privacidade')} className="hover:text-black transition-colors text-left text-xs">Política de Privacidade</button></li>
              <li><button onClick={() => go('politica-menores')} className="hover:text-black transition-colors text-left text-xs">Proteção de Menores</button></li>
              <li><button onClick={() => go('politica-menores')} className="hover:text-black transition-colors text-left text-xs">+18 Anos</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-4">PAGAMENTOS</h4>
            <div className="flex items-center gap-2 mb-4 bg-black/5 p-2 rounded border border-black/15">
              <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0 flex flex-col">
                <div className="flex-1 bg-[#9D9D9D]" />
                <div className="flex-1 bg-[#303030]" />
                <div className="flex-1 bg-[#9D9D9D]" />
              </div>
              <span className="text-black text-sm font-bold">AUTORIZADO</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>PIX - Instantâneo</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/15 pt-6 mb-6">
          <p className="text-gray-500 text-xs leading-relaxed mb-4">
            INSTAPIX.COM é operado pela INSTAPIX N.V., uma empresa constituída sob as leis de Curaçao,
            com o número de registro 123456 e endereço registrado em Heelsumstraat 51, Curaçao.
            A INSTAPIX N.V. é licenciada e regulamentada pela Autoridade de Jogos de Curaçao sob a
            licença GLH-OCCHKTW0123456789. É ilegal para menores de 18 anos abrir uma conta ou jogar
            na INSTAPIX. Jogue com responsabilidade.
          </p>
        </div>

        <div className="mb-6">
          <h5 className="text-gray-600 text-xs mb-3">MÉTODOS DE PAGAMENTO</h5>
          <div className="flex items-center gap-3 flex-wrap">
            <img src={pixIcon} alt="PIX" className="h-10 w-auto" />
            <span className="h-10 px-2.5 rounded border-2 border-black/70 text-black font-extrabold text-sm flex items-center justify-center">
              18+
            </span>
          </div>
        </div>

        <div className="border-t border-black/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2026 INSTAPIX. Todos os direitos reservados.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#58B0B1] text-xs hover:text-[#404040]"
          >
            VOLTAR AO TOPO ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
