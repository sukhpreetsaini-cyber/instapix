import { useState } from 'react';
import { Home, Gamepad2, Layers, Video, Grid3x3, Search } from 'lucide-react';
import type { PageType } from '../pages/GameCategoryPage';

type Page = PageType | 'home';

interface HomeCategoryBarProps {
  onNavigate?: (page: Page) => void;
}

const tabs: { icon: React.ElementType; label: string; page?: Page }[] = [
  { icon: Home, label: 'Lobby', page: 'home' },
  { icon: Gamepad2, label: 'Originals', page: 'jogos' },
  { icon: Layers, label: 'Slots', page: 'slots' },
  { icon: Video, label: 'Live Casino', page: 'cassino' },
  { icon: Grid3x3, label: 'Table Games' },
];

export function HomeCategoryBar({ onNavigate }: HomeCategoryBarProps) {
  const [active, setActive] = useState('Lobby');

  return (
    <div className="flex items-center justify-between gap-3 mt-3 mb-5">
      <div className="inline-flex items-center gap-1.5 overflow-x-auto scrollbar-hide bg-[#ECECEC] border border-black/8 rounded-xl px-2 h-[50px] min-w-0 max-w-full">
        {tabs.map((tab) => {
          const isActive = tab.label === active;
          return (
            <button
              key={tab.label}
              onClick={() => {
                setActive(tab.label);
                if (tab.page) onNavigate?.(tab.page);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive
                  ? 'bg-[#E3E3E3] border border-[#C5C5C5] text-[#58B0B1]'
                  : 'text-gray-600 hover:text-black hover:bg-black/5 border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-2.5 bg-[#ECECEC] border border-black/8 rounded-xl px-3.5 h-[50px] w-full max-w-xs flex-shrink-0">
        <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar jogos, categorias..."
          className="bg-transparent text-black placeholder-gray-500 text-sm focus:outline-none w-full"
        />
      </div>
    </div>
  );
}
