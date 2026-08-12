import logoImage from '../../imports/instapix-icon-green.svg';
import { EsportsIcon, JogosIcon, CassinoIcon, SlotsIcon } from './icons';
import type { PageType } from '../pages/GameCategoryPage';

type Page = PageType | 'home';

interface Props {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const items: { icon: React.ElementType; label: string; page: Page }[] = [
  { icon: EsportsIcon, label: 'Esportes', page: 'home' },
  { icon: JogosIcon, label: 'Jogos', page: 'jogos' },
  { icon: CassinoIcon, label: 'Cassino', page: 'cassino' },
  { icon: SlotsIcon, label: 'Slots', page: 'slots' },
];

function NavItem({ item, isActive, onClick }: { item: (typeof items)[number]; isActive: boolean; onClick: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <button
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-xl transition-colors"
        style={isActive ? { background: 'radial-gradient(circle 50px at center 120%, #58B3AD, #0F242F00)' } : undefined}
      >
        <item.icon className="w-7 h-7" />
        <span className={`text-[11px] font-semibold leading-none whitespace-nowrap ${isActive ? 'text-white' : 'text-white/60'}`}>
          {item.label}
        </span>
      </button>
    </div>
  );
}

export function MobileBottomBar({ activePage, onNavigate }: Props) {
  // 'home' is a placeholder page for Esportes (no dedicated sports page yet) — don't show it
  // as selected just because the app happens to default to the home page on load.
  const isItemActive = (page: Page) => page !== 'home' && activePage === page;

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-50">
      <div
        className="mobile-nav-shadow relative rounded-full border border-[#2A5A6E] backdrop-blur-xl px-3 bg-[#163242E6]"
      >
        <div className="flex items-center h-20">
          {/* First 2 items */}
          {items.slice(0, 2).map((item) => (
            <NavItem key={item.page} item={item} isActive={isItemActive(item.page)} onClick={() => onNavigate(item.page)} />
          ))}

          {/* Centre logo — same rotating ring / glow badge as the login page, scaled up to fit this taller bar */}
          <button
            onClick={() => onNavigate('home')}
            className="relative flex items-center justify-center w-[78px] h-[78px] rounded-full flex-shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="mobile-nav-ring absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" />
            <span className="mobile-nav-glow absolute inset-0 rounded-full animate-pulse" />
            <span className="relative w-[67px] h-[67px] rounded-full bg-[#1F475F] border-2 border-[#0B1921] shadow-lg flex items-center justify-center overflow-hidden">
              <img src={logoImage} alt="Home" className="w-[52px] h-[52px] object-contain" />
            </span>
          </button>

          {/* Last 2 items */}
          {items.slice(2).map((item) => (
            <NavItem key={item.page} item={item} isActive={isItemActive(item.page)} onClick={() => onNavigate(item.page)} />
          ))}
        </div>
      </div>
    </div>
  );
}
