import { Trophy, TrendingUp, X } from 'lucide-react';
import imgGatesOlympus from '../../imports/Gates-of-Olympus-featured.png';
import imgOx from '../../imports/ox-featured.png';
import imgSweetBonanza from '../../imports/SweetBonanza-featured.png';
import imgBuffaloKing from '../../imports/Buffalo-King-featured.png';
import imgFortuneMouse from '../../imports/fortune-mouse-featured.png';
import imgKnockout from '../../imports/Knockout-riches-featured.png';
import imgZeus from '../../imports/Zeus-lightning-featured.png';

interface CasinoWinner {
  user: string;
  game: string;
  amount: string;
  time: string;
  gameImage: string;
}

const casinoWinners: CasinoWinner[] = [
  { user: 'Pedro***', game: 'Gates of Olympus', amount: 'R$ 15,420', time: '2 min', gameImage: imgGatesOlympus },
  { user: 'Maria***', game: 'Fortune Ox', amount: 'R$ 8,750', time: '5 min', gameImage: imgOx },
  { user: 'João***', game: 'Zeus Lightning', amount: 'R$ 22,100', time: '8 min', gameImage: imgZeus },
  { user: 'Ana***', game: 'Sweet Bonanza', amount: 'R$ 6,890', time: '12 min', gameImage: imgSweetBonanza },
  { user: 'Carlos***', game: 'Buffalo King', amount: 'R$ 11,230', time: '15 min', gameImage: imgBuffaloKing },
  { user: 'Juliana***', game: 'Fortune Mouse', amount: 'R$ 9,450', time: '18 min', gameImage: imgFortuneMouse },
  { user: 'Rafael***', game: 'Knockout Riches', amount: 'R$ 5,670', time: '22 min', gameImage: imgKnockout },
];

export function RecentWinners({ onClose, fullHeight = false }: { onClose?: () => void; fullHeight?: boolean }) {
  return (
    <aside className={`w-80 bg-white border-l border-black/10 flex flex-col fixed right-0 z-40 ${fullHeight ? 'top-0 h-screen' : 'top-[82px] h-[calc(100vh-82px)]'}`}>
      <div className="px-4 py-3 border-b border-black/10 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#58B0B1]" />
            <h3 className="text-black font-bold">Ganhadores Recentes</h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-black/5 transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {casinoWinners.map((winner, index) => (
          <div
            key={index}
            className="bg-[#F5F5F5] rounded-lg p-3 hover:bg-[#ECECEC] transition-colors border border-black/8"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border-2 border-[#58B0B1]/50">
                <img
                  src={winner.gameImage}
                  alt={winner.game}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-black text-sm font-medium">{winner.user}</span>
                  <span className="text-gray-500 text-xs">{winner.time}</span>
                </div>
                <p className="text-gray-600 text-xs truncate mb-2">{winner.game}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#58B0B1]" />
                  <span className="text-[#58B0B1] font-bold text-sm">{winner.amount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-black/10 bg-[#ECECEC] flex-shrink-0">
        <p className="text-center text-gray-600 text-xs mb-2">
          Seja o próximo grande vencedor!
        </p>
        <button className="w-full bg-[#58B0B1] hover:opacity-90 transition-opacity text-white px-4 py-2 rounded font-medium text-sm">
          Jogar Agora
        </button>
      </div>
    </aside>
  );
}
