import { Bell, Trophy } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
import logoIcon from '../../imports/instapix-logo-icon.svg';

interface HeaderProps {
  onToggleSidebar?: () => void;
  mobileSidebarOpen?: boolean;
  onNavigate?: (page: string) => void;
  onOpenDeposit?: () => void;
  showWinners?: boolean;
  onToggleWinners?: () => void;
  onOpenMobileWinners?: () => void;
  mobileWinnersOpen?: boolean;
}

export function Header({ onNavigate, onOpenDeposit, showWinners, onToggleWinners, onOpenMobileWinners, mobileWinnersOpen }: HeaderProps) {
  return (
    <header className="bg-[#F5F5F5] border-b border-black/8 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-3 fixed top-0 left-0 lg:left-64 right-0 z-50 h-[82px]">
      {/* Left side */}
      <div className="flex items-center gap-1.5 sm:gap-4 lg:gap-6 h-full flex-shrink-0 min-w-0">
        {/* Mobile logo mark — sidebar (which carries the full logo) is hidden by default on mobile */}
        <button onClick={() => onNavigate?.('home')} className="lg:hidden flex-shrink-0">
          <img src={logoIcon} alt="Instapix" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
        </button>

        {/* Mobile notification bell */}
        <button
          onClick={() => onNavigate?.('notificacoes')}
          className="lg:hidden relative p-1.5 sm:p-2 hover:bg-black/5 rounded-xl transition-colors flex-shrink-0"
        >
          <Bell className="w-5 h-5 text-gray-800" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#58B0B1] rounded-full"></span>
        </button>

        {/* Mobile recent winners access */}
        <button
          onClick={onOpenMobileWinners}
          title="Ganhadores Recentes"
          className="xl:hidden p-1.5 sm:p-2 hover:bg-black/5 rounded-xl transition-colors flex-shrink-0"
        >
          <Trophy className={`w-5 h-5 ${mobileWinnersOpen ? 'text-[#58B0B1]' : 'text-black'}`} />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink min-w-0 justify-end">
        <button
          onClick={() => onNavigate?.('notificacoes')}
          className="relative bg-black/5 p-2 rounded-xl hover:bg-black/10 border border-black/10 hidden md:block flex-shrink-0"
        >
          <Bell className="w-5 h-5 text-gray-800" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#58B0B1] rounded-full"></span>
        </button>

        <button
          onClick={onToggleWinners}
          title="Ganhadores Recentes"
          className={`p-2 rounded-xl border hidden xl:block transition-colors flex-shrink-0 ${
            showWinners ? 'bg-[#58B0B1]/10 border-[#58B0B1]' : 'bg-black/5 hover:bg-black/10 border-black/10'
          }`}
        >
          <Trophy className={`w-5 h-5 ${showWinners ? 'text-[#58B0B1]' : 'text-black'}`} />
        </button>

        {/* Balance */}
        <div className="flex items-center gap-1.5 sm:gap-3 bg-black/5 border border-black/10 rounded-xl pl-2 sm:pl-3 pr-1.5 h-[46px] min-w-0">
          <div className="flex flex-col gap-0.5 pr-0.5 sm:pr-1 min-w-0">
            <span className="text-black text-xs sm:text-sm md:text-base font-semibold leading-none whitespace-nowrap">
              R$ 1,200.00
            </span>
            <span className="block text-[#58B0B1] text-[9px] sm:text-[10px] md:text-[11px] font-normal leading-none whitespace-nowrap">
              Bônus: R$3000
            </span>
          </div>
          <button onClick={onOpenDeposit} className="bg-[#58B0B1] hover:opacity-90 transition-opacity text-white px-2.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold flex-shrink-0 whitespace-nowrap">
            + Depositar
          </button>
        </div>

        {/* Mobile/tablet profile — desktop version lives in the sidebar */}
        <div className="lg:hidden flex-shrink-0">
          <ProfileDropdown compact onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
}
