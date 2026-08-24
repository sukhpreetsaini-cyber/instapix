import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, Trophy, Users, Calendar, Clock, Zap,
  Tag, Award, ChevronRight, Star
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { tournaments } from '../data/tournaments';
import type { Tournament } from '../data/tournaments';

// ─── Countdown ───────────────────────────────────────────────────────────────
function useCountdown(endDate: string) {
  const calc = () => {
    const diff = Math.max(0, new Date(endDate).getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [endDate]);
  return time;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-black font-extrabold text-lg bg-[#E3E3E3] border border-[#58B0B11F]"
      >
        {String(value).padStart(2, '0')}
      </div>
      <p className="text-gray-500 text-[9px] uppercase tracking-widest">{label}</p>
    </div>
  );
}

function CountdownRow({ countdown }: { countdown: { days: number; hours: number; minutes: number; seconds: number } }) {
  const units = [
    { value: countdown.days,    label: 'D' },
    { value: countdown.hours,   label: 'H' },
    { value: countdown.minutes, label: 'M' },
    { value: countdown.seconds, label: 'S' },
  ];
  return (
    <div className="flex items-start gap-1.5">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-start gap-1.5">
          <CountdownBox value={u.value} label={u.label} />
          {i < units.length - 1 && (
            <span className="text-gray-500 font-bold text-base mt-2.5">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
const leaderboard = [
  { pos: 1,  user: 'DragonMaster',  score: '5.842x',  amount: 'R$ 20.000' },
  { pos: 2,  user: 'SlotKing99',    score: '4.219x',  amount: 'R$ 10.000' },
  { pos: 3,  user: 'FortuneLuck',   score: '3.801x',  amount: 'R$ 5.000'  },
  { pos: 4,  user: 'GA, Apostador', score: '3.442x',  amount: 'R$ 3.000', isMe: true },
  { pos: 5,  user: 'CasinoStar',    score: '2.991x',  amount: 'R$ 2.000'  },
  { pos: 6,  user: 'BigWinner',     score: '2.754x',  amount: 'R$ 1.500'  },
  { pos: 7,  user: 'LuckyCharm',    score: '2.612x',  amount: 'R$ 1.000'  },
  { pos: 8,  user: 'RollHigh',      score: '2.401x',  amount: 'R$ 1.000'  },
  { pos: 9,  user: 'SpinMaster',    score: '2.200x',  amount: 'R$ 1.000'  },
  { pos: 10, user: 'MegaSlot',      score: '2.044x',  amount: 'R$ 1.000'  },
];

const medalColors = ['#58B0B1', '#5D5D5D', '#838383'];
const placeLabels = ['🥇', '🥈', '🥉'];

// ─── Small game card for carousel ─────────────────────────────────────────────
function GameChip({ title, image }: { title: string; image: string }) {
  return (
    <div className="flex-shrink-0 w-28 rounded-xl overflow-hidden border border-black/10 hover:border-black/20 transition-colors cursor-pointer">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <p className="absolute bottom-1 left-1 right-1 text-black text-[10px] font-semibold truncate">{title}</p>
      </div>
    </div>
  );
}

// ─── Reuse TournamentCard mini ────────────────────────────────────────────────
function MiniTournamentCard({ t, onDetail }: { t: Tournament; onDetail: () => void }) {
  const finished = t.status === 'finished';
  return (
    <div
      className={`flex-shrink-0 w-72 rounded-2xl overflow-hidden border flex flex-col transition-all tournament-card-bg ${
        finished ? 'border-black/15 opacity-65' : 'border-black/10 hover:border-[#58B0B1]/30'
      }`}
    >
      <div className="relative overflow-hidden aspect-tournament">
        <img src={t.image} alt={t.name} className="w-full h-full object-cover dyn-filter"
          style={{ '--dyn-filter': finished ? 'grayscale(80%) brightness(0.5)' : 'brightness(0.8)' } as React.CSSProperties} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        <span className="absolute top-2.5 left-3 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full dyn-bg" style={{ '--dyn-bg': t.badgeColor } as React.CSSProperties}>{t.badge}</span>
        <div className="absolute top-2.5 right-3 flex items-center gap-1 bg-black/55 rounded-full px-2 py-0.5">
          <Users className="w-3 h-3 text-gray-700" />
          <span className="text-black text-[10px] font-semibold">{t.participants.toLocaleString('pt-BR')}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5">
          <p className="text-gray-600 text-[9px] uppercase tracking-widest leading-none mb-0.5">{t.provider}</p>
          <h3 className="text-black font-bold text-sm leading-snug">{t.name}</h3>
        </div>
      </div>
      <div className="px-3 pt-3 pb-3 flex flex-col gap-2.5">
        <div>
          <p className="text-gray-500 text-[9px] uppercase tracking-wider leading-none mb-0.5">Prêmio Total</p>
          <p className="font-extrabold text-base leading-none text-[#58B0B1]">{t.totalPrize}</p>
        </div>
        <div className="flex gap-1.5">
          {t.prizes.slice(0, 3).map((p, i) => (
            <div key={i} className="flex-1 flex items-center gap-1 bg-black/4 border border-black/6 rounded-xl px-2 py-1.5">
              <span className="text-sm leading-none">{placeLabels[i]}</span>
              <span className="text-black text-[10px] font-bold truncate">{p.amount}</span>
            </div>
          ))}
        </div>
        <button onClick={onDetail}
          className="w-full py-2 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity bg-[#58B0B1]">
          Saiba mais
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props {
  tournamentId: string;
  onBack: () => void;
  onSelectTournament: (id: string) => void;
  onNavigateStatic?: (slug: string) => void;
}

export function TournamentDetailPage({ tournamentId, onBack, onSelectTournament, onNavigateStatic }: Props) {
  const t = tournaments.find(x => x.id === tournamentId) ?? tournaments[0];
  const countdown = useCountdown(t.endDate);
  const gamesRef = useRef<HTMLDivElement>(null);
  const othersRef = useRef<HTMLDivElement>(null);
  const gamesMobileRef = useRef<HTMLDivElement>(null);

  const others = tournaments.filter(x => x.id !== t.id && x.status === 'available').slice(0, 4);

  const scrollGames = (dir: 'left' | 'right') =>
    gamesRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  const scrollOthers = (dir: 'left' | 'right') =>
    othersRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });

  const summaryItems = [
    { icon: Tag,      label: 'Tipo de Torneio',    value: t.type,       sub: null },
    { icon: Calendar, label: 'Duração',             value: t.duration,   sub: null },
    { icon: Trophy,   label: 'Total de Prêmios',   value: t.totalPrize, sub: null },
    { icon: Award,    label: 'Tipo de Prêmio',     value: t.prizeType,  sub: null },
    { icon: Zap,      label: 'Tipo de Pontuação',  value: t.scoring,    sub: 'Cada R$ 1,00 = 1 Ponto' },
  ];

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden min-h-[480px]">
        <img
          src={t.image}
          alt={t.name}
          className="absolute inset-0 w-full h-full object-cover detail-hero-filter"
        />
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F9F9] via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col h-full min-h-[480px]">
          {/* Back */}
          <button onClick={onBack}
            className="flex items-center gap-1.5 text-gray-700 hover:text-black text-sm font-medium mb-8 transition-colors w-fit">
            <ChevronLeft className="w-4 h-4" /> Torneios
          </button>

          <div className="flex-1 flex flex-col justify-end pb-4">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-black text-xs font-bold px-3 py-1 rounded-full dyn-bg" style={{ '--dyn-bg': t.badgeColor } as React.CSSProperties}>{t.badge}</span>
              <span className="text-black text-xs font-semibold px-3 py-1 rounded-full bg-black/15 border border-black/20">
                {t.provider}
              </span>
            </div>

            <h1 className="text-black font-extrabold text-3xl sm:text-5xl leading-tight mb-3 max-w-2xl">
              {t.name}
            </h1>
            {t.description && (
              <p className="text-gray-700 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">{t.description}</p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              {/* Prize — left */}
              <div>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">Prêmio Total</p>
                <p className="font-extrabold text-4xl sm:text-5xl leading-none text-[#58B0B1]">
                  {t.totalPrize}
                </p>
              </div>

              {/* Countdown + CTA — right, stacked */}
              {t.status === 'available' && (
                <div className="flex flex-col items-start sm:items-end gap-3">
                  <CountdownRow countdown={countdown} />
                  <button
                    className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity bg-[#58B0B1]"
                  >
                    <span className="text-base leading-none">▶</span> Inscrição Automática
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary bar ──────────────────────────────────────────────────── */}
      <div className="border-b border-black/15 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto [scrollbar-width:none] divide-x divide-black/5">
            {summaryItems.map(item => (
              <div key={item.label} className="flex items-center gap-3 px-5 py-4 flex-shrink-0">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#58B0B118]">
                  <item.icon className="w-3.5 h-3.5 text-[#58B0B1]" />
                </div>
                <div>
                  <p className="text-gray-500 text-[9px] uppercase tracking-wider">{item.label}</p>
                  <p className="text-black text-sm font-semibold">{item.value}</p>
                  {item.sub && <p className="text-gray-500 text-[10px] mt-0.5">{item.sub}</p>}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0">
              <Users className="w-4 h-4 flex-shrink-0 text-[#58B0B1]" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-wide">Participantes</p>
                <p className="text-black text-sm font-semibold">{t.participants.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left col: Leaderboard ── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#ECECEC] rounded-2xl border border-black/10 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/15">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#58B0B1]" />
                    <h2 className="text-black font-bold text-sm">Ranking ao Vivo</h2>
                  </div>
                  <span className="text-xs text-gray-500">{t.participants.toLocaleString('pt-BR')} jogadores</span>
                </div>
                <div className="divide-y divide-black/5">
                  {leaderboard.map((row) => (
                    <div
                      key={row.pos}
                      className={`flex items-center gap-4 px-5 py-3 ${row.isMe ? 'border-l-2' : ''}`}
                      style={row.isMe ? {
                        backgroundColor: 'rgba(0,0,0,0.08)',
                        borderColor: '#58B0B1',
                      } : {}}
                    >
                      {/* Position */}
                      <div className="w-7 flex-shrink-0 text-center">
                        {row.pos <= 3
                          ? <span className="text-lg">{placeLabels[row.pos - 1]}</span>
                          : <span className="text-gray-500 text-sm font-bold">{row.pos}</span>}
                      </div>

                      {/* Avatar */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0 dyn-bg dyn-border-full"
                        style={{ '--dyn-bg': row.isMe ? '#58B0B133' : '#58B0B115', '--dyn-border-full': row.isMe ? '1.5px solid #58B0B1' : '1.5px solid #58B0B120' } as React.CSSProperties}
                      >
                        {row.user.slice(0, 2).toUpperCase()}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold truncate ${row.isMe ? 'text-black' : 'text-gray-800'}`}>
                            {row.user}
                          </p>
                          {row.isMe && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0 bg-[#58B0B1]">Você</span>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs">{row.score}</p>
                      </div>

                      {/* Prize */}
                      <p className="text-sm font-bold flex-shrink-0 dyn-text" style={{ '--dyn-text': row.pos <= 3 ? medalColors[row.pos - 1] : '#8D8D8D' } as React.CSSProperties}>
                        {row.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Participating Games — desktop only (hidden on mobile) ── */}
              {t.games.length > 0 && (
                <div className="hidden lg:block bg-[#ECECEC] rounded-2xl border border-black/10 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-black/15">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#58B0B1]" />
                      <h2 className="text-black font-bold text-sm">Jogos Participantes</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => scrollGames('left')}
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-black transition-colors border border-black/10 bg-[#58B0B122]">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={() => scrollGames('right')}
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-black transition-colors border border-black/10 bg-[#58B0B122]">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div ref={gamesRef} className="flex gap-3 overflow-x-auto [scrollbar-width:none] scroll-smooth">
                      {t.games.map((g, i) => (
                        <GameChip key={i} title={g.title} image={g.image} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right col: Prize table + Rules ── */}
            <div className="space-y-6">

              {/* Prize table */}
              <div className="bg-[#ECECEC] rounded-2xl border border-black/10 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-black/15">
                  <Award className="w-4 h-4 text-[#58B0B1]" />
                  <h2 className="text-black font-bold text-sm">Distribuição de Prêmios</h2>
                </div>
                <div className="divide-y divide-black/5">
                  {t.prizes.map((p, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-base w-6 text-center">
                          {i < 3 ? placeLabels[i] : <span className="text-gray-500 text-xs font-bold">{p.place}º</span>}
                        </span>
                        <span className="text-gray-600 text-sm">{p.place}º lugar</span>
                      </div>
                      <span
                        className="text-sm font-bold dyn-text" style={{ '--dyn-text': i < 3 ? medalColors[i] : '#5D5D5D' } as React.CSSProperties}
                      >
                        {p.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Participating Games — mobile only (between prizes and rules) ── */}
              {t.games.length > 0 && (
                <div className="lg:hidden bg-[#ECECEC] rounded-2xl border border-black/10 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-black/15">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#58B0B1]" />
                      <h2 className="text-black font-bold text-sm">Jogos Participantes</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <div ref={gamesMobileRef} className="flex gap-3 overflow-x-auto [scrollbar-width:none] scroll-smooth">
                      {t.games.map((g, i) => (
                        <GameChip key={i} title={g.title} image={g.image} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Rules */}
              {t.rules.length > 0 && (
                <div className="bg-[#ECECEC] rounded-2xl border border-black/10 overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-black/15">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <h2 className="text-black font-bold text-sm">Regras do Torneio</h2>
                  </div>
                  <div className="p-5 space-y-3">
                    {t.rules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span
                          className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white mt-0.5 bg-[#58B0B1]"
                        >
                          {i + 1}
                        </span>
                        <p className="text-gray-600 text-xs leading-relaxed">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Other active tournaments ── */}
          {others.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#58B0B1]" />
                  <h2 className="text-black font-bold text-lg">Outros Torneios Ativos</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => scrollOthers('left')}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-black border border-black/10 bg-[#58B0B122]">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollOthers('right')}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-black border border-black/10 bg-[#58B0B122]">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div
                ref={othersRef}
                className="flex gap-4 overflow-x-auto [scrollbar-width:none] scroll-smooth pb-1"
              >
                {others.map(other => (
                  <MiniTournamentCard
                    key={other.id}
                    t={other}
                    onDetail={() => onSelectTournament(other.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
