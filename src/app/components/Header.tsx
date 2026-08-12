import { Bell, Menu, X, Trophy } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';

interface HeaderProps {
  onToggleSidebar?: () => void;
  mobileSidebarOpen?: boolean;
  onNavigate?: (page: string) => void;
  onOpenDeposit?: () => void;
  showWinners?: boolean;
  onToggleWinners?: () => void;
  onOpenMobileWinners?: () => void;
}

export function Header({ onToggleSidebar, mobileSidebarOpen, onNavigate, onOpenDeposit, showWinners, onToggleWinners, onOpenMobileWinners }: HeaderProps) {
  return (
    <header className="bg-[#0C181F] border-b border-white/8 px-4 sm:px-6 flex items-center justify-between gap-3 fixed top-0 left-0 lg:left-64 right-0 z-50 h-[82px]">
      {/* Left side */}
      <div className="flex items-center gap-1 sm:gap-4 lg:gap-6 h-full flex-1 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden -ml-2 p-2 hover:bg-white/5 rounded-xl transition-colors flex-shrink-0"
        >
          {mobileSidebarOpen
            ? <X className="w-6 h-6 text-white" />
            : <Menu className="w-6 h-6 text-white" />
          }
        </button>

        {/* Mobile notification bell — next to hamburger */}
        <button
          onClick={() => onNavigate?.('notificacoes')}
          className="lg:hidden relative p-2 hover:bg-white/5 rounded-xl transition-colors flex-shrink-0"
        >
          <Bell className="w-5 h-5 text-gray-200" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#58B3AD] rounded-full"></span>
        </button>

        {/* Mobile recent winners access */}
        <button
          onClick={onOpenMobileWinners}
          title="Recent Winners"
          className="xl:hidden p-2 hover:bg-white/5 rounded-xl transition-colors flex-shrink-0"
        >
          <Trophy className="w-5 h-5 text-[#58B3AD]" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
        <button
          onClick={() => onNavigate?.('notificacoes')}
          className="relative bg-white/5 p-2 rounded-xl hover:bg-white/10 border border-white/10 hidden md:block"
        >
          <Bell className="w-5 h-5 text-gray-200" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#58B3AD] rounded-full"></span>
        </button>

        <button
          onClick={onToggleWinners}
          title="Recent Winners"
          className={`p-2 rounded-xl border hidden xl:block transition-colors ${
            showWinners ? 'bg-[#58B3AD]/20 border-[#58B3AD]' : 'bg-white/5 hover:bg-white/10 border-white/10'
          }`}
        >
          <Trophy className={`w-5 h-5 ${showWinners ? 'text-[#58B3AD]' : 'text-gray-200'}`} />
        </button>

        {/* Balance */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-xl pl-3 pr-1.5 h-[46px]">
          <div className="flex flex-col gap-0.5 pr-1">
            <span className="text-white text-sm md:text-base font-semibold leading-none">
              R$ 1,200.00
            </span>
            <span className="text-[#58B3AD] text-[9px] sm:text-[10px] md:text-[11px] font-normal leading-none">
              Bônus: R$3000
            </span>
          </div>
          <button onClick={onOpenDeposit} className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold flex-shrink-0">
            + Depositar
          </button>
        </div>

        {/* Mobile/tablet profile — desktop version lives in the sidebar */}
        <div className="lg:hidden">
          <ProfileDropdown compact onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
}
