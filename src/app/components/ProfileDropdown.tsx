import { ChevronRight, LayoutDashboard, Wallet, Clock, Landmark, ShieldCheck, PauseCircle, Lock, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const profileMenuItems = [
  { icon: LayoutDashboard, label: 'Minha Conta',               action: 'minha-conta' },
  { icon: Wallet,          label: 'Carteira',                  action: 'carteira' },
  { icon: Clock,           label: 'Apostas',                   action: 'apostas' },
  { icon: ShieldCheck,     label: 'Limites',                   action: 'limites' },
  { icon: PauseCircle,     label: 'Pausas',                    action: 'pausas-suspensoes' },
  { icon: Lock,            label: 'Segurança',                 action: 'seguranca' },
  { icon: Landmark,        label: 'Gerenciar Contas Bancárias', action: 'contas-bancarias' },
];

interface ProfileDropdownProps {
  compact?: boolean;
  onNavigate?: (page: string) => void;
  /** 'header' = compact trigger, dropdown right-aligned with fixed width (default).
   *  'sidebar' = full-width trigger that fills its container, dropdown matches that width. */
  variant?: 'header' | 'sidebar';
}

export function ProfileDropdown({ compact = false, onNavigate, variant = 'header' }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isSidebar = variant === 'sidebar';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItem = (action: string | null) => {
    setOpen(false);
    if (action && onNavigate) onNavigate(action);
  };

  return (
    <div className={`relative ${isSidebar ? 'w-full' : ''}`} ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`flex items-center gap-2 bg-black/5 px-2 sm:px-3 rounded-xl hover:bg-black/10 border border-black/10 h-[46px] ${isSidebar ? 'w-full' : ''}`}
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#D5D5D5] to-[#58B0B1] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0">
          GA
        </div>
        {!compact && (
          <div className="text-left flex-1 min-w-0 hidden lg:block">
            <div className="text-black text-sm truncate">GA, Apostador</div>
          </div>
        )}
        {!compact && (
          <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 transition-transform flex-shrink-0 ml-auto ${open ? 'rotate-90' : ''}`} />
        )}
      </button>

      {open && (
        <div className={`absolute bg-[#EDEDED] rounded-xl shadow-2xl overflow-hidden z-[80] border border-black/10 ${isSidebar ? 'left-full top-0 ml-2 w-72' : 'right-0 top-full mt-2 w-72'}`}>
          {profileMenuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleItem(item.action)}
              className="w-full flex items-center gap-4 px-5 py-4 text-gray-700 hover:text-black hover:bg-black/5 transition-colors text-sm"
            >
              <item.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="h-px bg-black/10 mx-4" />
          <button className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:text-red-400 hover:bg-black/5 transition-colors text-sm">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}
