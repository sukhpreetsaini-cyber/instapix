import imgAviator from '../../imports/quickplay-aviator.jpg';
import imgRoleta from '../../imports/quickplay-roleta.jpg';
import imgSlots from '../../imports/quickplay-slots.jpg';
import type { PageType } from '../pages/GameCategoryPage';

type Page = PageType | 'home' | 'promocoes' | 'bonus' | 'refer' | 'torneios' | 'recompensas' | 'login';

interface QuickPlayRowProps {
  onNavigate?: (page: Page) => void;
}

const items: { img: string; title: string; page: PageType }[] = [
  { img: imgAviator, title: 'Aviator', page: 'jogos' },
  { img: imgRoleta, title: 'Roleta', page: 'cassino' },
  { img: imgSlots, title: 'Slots', page: 'slots' },
];

export function QuickPlayRow({ onNavigate }: QuickPlayRowProps) {
  return (
    <div className="flex sm:grid sm:grid-cols-3 gap-3 mt-3 mb-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      {items.map((item) => (
        <button
          key={item.title}
          onClick={() => onNavigate?.(item.page)}
          className="relative rounded-xl overflow-hidden border border-black/8 hover:opacity-90 transition-opacity flex-shrink-0 w-[85%] sm:w-auto snap-center"
        >
          <img src={item.img} alt={item.title} className="w-full h-auto object-cover" />
        </button>
      ))}
    </div>
  );
}
