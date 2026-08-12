import { Instagram, Youtube, LogIn, Headphones } from 'lucide-react';
import { EsportsIcon, JogosIcon, CassinoIcon, SlotsIcon, AviatorIcon, BonusIcon, HomeIcon, PromocoesIcon, RecompensasIcon, ReferIcon } from './icons';
import logoImage from '../../imports/instapix-logo-full-green.svg';
import bonusBannerImage from '../../imports/sidebar-bonus-banner.png';
import { ProfileDropdown } from './ProfileDropdown';
import type { PageType } from '../pages/GameCategoryPage';

type Page = PageType | 'home' | 'promocoes' | 'bonus' | 'refer' | 'torneios' | 'recompensas' | 'login';

const menuItems: { icon: React.ElementType; label: string; page?: Page }[] = [
  { icon: HomeIcon, label: 'Início', page: 'home' },
  { icon: JogosIcon, label: 'Jogos', page: 'jogos' },
  { icon: SlotsIcon, label: 'Slots', page: 'slots' },
  { icon: CassinoIcon, label: 'Cassino', page: 'cassino' },
  { icon: AviatorIcon, label: 'Aviator' },
  { icon: EsportsIcon, label: 'Esportes' },
  { icon: PromocoesIcon, label: 'Promoções', page: 'promocoes' as Page },
  { icon: RecompensasIcon,  label: 'Recompensas',    page: 'recompensas' as Page },
  { icon: BonusIcon,   label: 'Bônus',          page: 'bonus' as Page },
  { icon: ReferIcon, label: 'Refer',          page: 'refer' as Page },
  // TODO: temporary link for testing the Login page — remove once real auth entry points exist
  { icon: LogIn, label: 'Login', page: 'login' as Page },
];

interface SidebarProps {
  activePage?: Page;
  onNavigate?: (page: Page) => void;
  onNavigateStatic?: (slug: string) => void;
}

export function Sidebar({ activePage = 'home', onNavigate, onNavigateStatic }: SidebarProps) {
  return (
    <aside className="w-64 h-full bg-[#0C181F] border-r border-white/8 flex flex-col">
      {/* Logo — clickable to go home. Hidden on mobile (mobile drawer shows its own header via App shell). */}
      <button
        onClick={() => onNavigate?.('home')}
        className="hidden lg:flex items-center pt-5 pb-4 px-4 flex-shrink-0"
      >
        <img src={logoImage} alt="Instapix" className="w-full h-auto object-contain" />
      </button>

      {/* Bonus promo banner */}
      <div className="px-4 pt-4 lg:pt-0 pb-4 flex-shrink-0">
        <button
          onClick={() => onNavigate?.('bonus')}
          className="w-full rounded-xl overflow-hidden border border-white/10 hover:opacity-90 transition-opacity"
        >
          <img src={bonusBannerImage} alt="Ganhe R$50 de bônus" className="w-full h-auto object-cover block" />
        </button>
      </div>

      {/* Account dropdown — desktop only, mobile keeps its version in the top bar */}
      <div className="hidden lg:block px-4 pb-4 flex-shrink-0">
        <ProfileDropdown variant="sidebar" onNavigate={(page) => onNavigate?.(page as Page)} />
      </div>

      {/* Nav — icon + label rows */}
      <nav className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-3 flex flex-col gap-1">
        {menuItems.map((item, index) => {
          const isActive = item.page && item.page === activePage;
          return (
            <button
              key={index}
              onClick={() => item.page && onNavigate?.(item.page)}
              title={item.label}
              className={`flex items-center gap-3 py-2.5 px-3 w-full rounded-xl transition-colors text-left ${
                isActive ? 'bg-[#16323F] border border-[#2A5A6E]' : 'hover:bg-white/5'
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${
                  isActive ? 'bg-white/10' : ''
                }`}
              >
                <item.icon className={`${item.label === 'Jogos' || item.label === 'Slots' ? 'w-6 h-6' : 'w-[18px] h-[18px]'} ${isActive ? 'text-[#58B3AD]' : 'text-gray-400'}`} />
              </span>
              <span className={`text-[13px] leading-tight ${isActive ? 'text-[#58B3AD] font-semibold' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom social + support icons */}
      <div className="px-5 py-4 flex-shrink-0 border-t border-white/8 mt-2">
        <div className="flex gap-2">
          <a href="#" className="bg-white/5 p-2 rounded-xl hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="bg-white/5 p-2 rounded-xl hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
          <button title="Suporte 24/7" className="bg-white/5 p-2 rounded-xl hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
            <Headphones className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
