import { Trophy, TrendingUp, Dribbble, Activity, Target, X } from 'lucide-react';
import imgGatesOlympus from '../../imports/Gates-of-Olympus-featured.png';
import imgOx from '../../imports/ox-featured.png';
import imgSweetBonanza from '../../imports/SweetBonanza-featured.png';
import imgBuffaloKing from '../../imports/Buffalo-King-featured.png';
import imgFortuneMouse from '../../imports/fortune-mouse-featured.png';
import imgKnockout from '../../imports/Knockout-riches-featured.png';
import imgZeus from '../../imports/Zeus-lightning-featured.png';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface CasinoWinner {
  user: string;
  game: string;
  amount: string;
  time: string;
  gameImage: string;
}

interface SportsbookWinner {
  user: string;
  game: string;
  amount: string;
  time: string;
  sportIcon: LucideIcon;
  sportColor: string;
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

const sportsbookWinners: SportsbookWinner[] = [
  { user: 'Lucas***', game: 'Flamengo vs Palmeiras', amount: 'R$ 18,900', time: '3 min', sportIcon: Dribbble, sportColor: 'from-green-600 to-green-700' },
  { user: 'Fernanda***', game: 'Lakers vs Warriors', amount: 'R$ 12,500', time: '7 min', sportIcon: Target, sportColor: 'from-orange-600 to-orange-700' },
  { user: 'Ricardo***', game: 'Liverpool vs Chelsea', amount: 'R$ 7,800', time: '10 min', sportIcon: Dribbble, sportColor: 'from-[#1F475F] to-[#163242]' },
  { user: 'Camila***', game: 'UFC 300', amount: 'R$ 14,200', time: '14 min', sportIcon: Activity, sportColor: 'from-red-600 to-red-700' },
  { user: 'Bruno***', game: 'Corinthians vs São Paulo', amount: 'R$ 9,300', time: '19 min', sportIcon: Dribbble, sportColor: 'from-rose-600 to-rose-700' },
  { user: 'Patricia***', game: 'NBA Finals', amount: 'R$ 16,700', time: '23 min', sportIcon: Target, sportColor: 'from-yellow-600 to-yellow-700' },
];

export function RecentWinners({ onClose }: { onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<'casino' | 'sportsbook'>('casino');

  return (
    <aside className="w-80 bg-gradient-to-b from-[#0C181F] via-[#0F242F] to-[#0C181F] border-l border-white/8 flex flex-col h-[calc(100vh-82px)] fixed top-[82px] right-0 z-40">
      <div className="px-4 py-3 border-b border-white/8 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#58B3AD]" />
            <h3 className="text-white">Recent Winners</h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-gray-300" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('casino')}
            className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
              activeTab === 'casino'
                ? 'bg-[#1F475F] text-white'
                : 'bg-[#163242] text-gray-300 hover:text-white hover:bg-[#1c3d4f]'
            }`}
          >
            Casino
          </button>
          <button
            onClick={() => setActiveTab('sportsbook')}
            className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
              activeTab === 'sportsbook'
                ? 'bg-[#1F475F] text-white'
                : 'bg-[#163242] text-gray-300 hover:text-white hover:bg-[#1c3d4f]'
            }`}
          >
            Esportes
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {activeTab === 'casino' ? (
          casinoWinners.map((winner, index) => (
            <div
              key={index}
              className="bg-[#163242] rounded-lg p-3 hover:bg-[#1c3d4f] transition-colors border border-[#2A5A6E]/40"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border-2 border-[#58B3AD]/50">
                  <img
                    src={winner.gameImage}
                    alt={winner.game}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">{winner.user}</span>
                    <span className="text-gray-500 text-xs">{winner.time}</span>
                  </div>
                  <p className="text-gray-400 text-xs truncate mb-2">{winner.game}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 font-bold text-sm">{winner.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          sportsbookWinners.map((winner, index) => (
            <div
              key={index}
              className="bg-[#163242] rounded-lg p-3 hover:bg-[#1c3d4f] transition-colors border border-[#2A5A6E]/40"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${winner.sportColor} border-2 border-[#58B3AD]/50`}>
                  <winner.sportIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">{winner.user}</span>
                    <span className="text-gray-500 text-xs">{winner.time}</span>
                  </div>
                  <p className="text-gray-400 text-xs truncate mb-2">{winner.game}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 font-bold text-sm">{winner.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/8 bg-gradient-to-r from-[#1F475F]/30 to-[#58B3AD]/20 flex-shrink-0">
        <p className="text-center text-gray-400 text-xs mb-2">
          Seja o próximo grande vencedor!
        </p>
        <button className="w-full bg-gradient-to-r from-[#1F475F] to-[#58B3AD] hover:opacity-90 transition-opacity text-white px-4 py-2 rounded font-medium text-sm">
          Jogar Agora
        </button>
      </div>
    </aside>
  );
}
