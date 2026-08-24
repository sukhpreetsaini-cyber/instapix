import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import logoImage from '../../imports/instapix-logo-icon.svg';

interface Props {
  children: ReactNode;
  onGoHome?: () => void;
  onClose?: () => void;
}

export function AuthLayout({ children, onGoHome, onClose }: Props) {
  useEffect(() => {
    if (!onClose) return;
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] w-full h-full flex items-center justify-center px-4 py-8 overflow-y-auto bg-black/75 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose?.()}
    >
      <div className="relative w-full max-w-md my-8">
        {/* Animated logo badge — same rotating ring / glow as the mobile bottom nav,
            overlapping the card 50% inside / 50% outside */}
        <button
          onClick={onGoHome}
          className="absolute left-1/2 -translate-x-1/2 -top-[39px] z-20 flex items-center justify-center w-[78px] h-[78px] rounded-full flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="mobile-nav-ring absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" />
          <span className="mobile-nav-glow absolute inset-0 rounded-full animate-pulse" />
          <span className="relative w-[67px] h-[67px] rounded-full bg-[#D5D5D5] border-2 border-[#F5F5F5] shadow-lg flex items-center justify-center overflow-hidden">
            <img src={logoImage} alt="INSTAPIX" className="w-[52px] h-[52px] object-contain" />
          </span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-[18px] -right-[18px] z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 border border-black/15 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-black" />
          </button>
        )}

        <div
          className="w-full rounded-2xl overflow-hidden shadow-2xl border border-black/15 pt-9 auth-card-glow"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
