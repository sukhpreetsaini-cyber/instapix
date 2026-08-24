import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const providers = [
  'Pragmatic Play',
  'Evolution',
  'Playtech',
  'Red Tiger',
  'PG Soft',
  'NetEnt',
  'Microgaming',
  'Betsoft',
];

export function ProvidersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-black font-semibold text-base sm:text-lg">Provedores</h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="text-black p-1.5 rounded transition-colors border border-[#58B0B1]/40 hover:border-[#58B0B1] bg-[#58B0B122]"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#58B0B1')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#58B0B122')}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="text-black p-1.5 rounded transition-colors border border-[#58B0B1]/40 hover:border-[#58B0B1] bg-[#58B0B122]"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#58B0B1')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#58B0B122')}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {providers.map((name) => (
          <div
            key={name}
            className="flex-shrink-0 w-[180px] h-20 rounded-xl bg-black/5 border border-black/10 hover:border-black/25 hover:bg-black/[0.08] transition-colors flex items-center justify-center px-4"
          >
            <span className="text-gray-700 font-bold text-sm text-center tracking-wide">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
