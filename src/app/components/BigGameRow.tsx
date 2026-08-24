import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface Game {
  title: string;
  provider: string;
  image: string;
}

interface BigGameRowProps {
  title: string;
  icon?: React.ReactNode;
  games: Game[];
  liveTag?: boolean;
}

export function BigGameRow({ title, icon, games, liveTag }: BigGameRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="bg-gradient-to-r from-[#D5D5D5] to-[#58B0B1] p-1 rounded">
              {icon}
            </div>
          )}
          <div className="flex items-center gap-2">
            <h2 className="text-black text-lg">{title}</h2>
            {liveTag && (
              <span className="hidden sm:inline-flex bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">LIVE</span>
            )}
          </div>
        </div>

        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="text-black p-2 rounded transition-colors border border-[#58B0B1]/40 hover:border-[#58B0B1] bg-[#58B0B122]"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#58B0B1')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#58B0B122')}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="text-black p-2 rounded transition-colors border border-[#58B0B1]/40 hover:border-[#58B0B1] bg-[#58B0B122]"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#58B0B1')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#58B0B122')}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {games.map((game, index) => (
          <button
            key={index}
            className="rounded-lg overflow-hidden group hover:scale-105 hover:shadow-xl hover:shadow-[#58B0B1]/30 transition-all flex-shrink-0 w-[23vw] sm:w-[calc(20%-12.8px)] relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
