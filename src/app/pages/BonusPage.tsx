import { useState } from 'react';
import { Clock, Tag, RotateCcw, CheckCircle2, XCircle, Zap, Gift, Star } from 'lucide-react';
import { Footer } from '../components/Footer';

interface Bonus {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  rollover: string;
  expiry: string;
  type: string;
  status: 'active' | 'available' | 'inactive';
  inactiveReason?: string;
  requiresDeposit?: boolean;
  rules: string[];
}

const bonuses: Bonus[] = [
  {
    id: 'spin-aviator',
    title: '1 Rodada Grátis para Aviator',
    description: 'Sua rodada grátis está disponível. Jogue agora no Aviator!',
    emoji: '🎰',
    gradient: 'from-neutral-900/60 to-black',
    accentColor: '#EF4444',
    rollover: '1x',
    expiry: '6 dias',
    type: 'Cassino',
    status: 'active',
    rules: [
      'Saldo mínimo para ativação e uso: R$10.',
      'É necessário clicar em Ativar para usar o bônus.',
      'O bônus possui período total de expiração de 29 dias.',
      'Rollover: 30% do saldo atual, até 6x.',
      'Limite de conversão para saldo real em dinheiro: até 5x o valor do bônus convertido.',
      'Validade: O bônus é válido por 29 dias a partir da ativação.',
      'Bônus válido para jogadores que fizerem pelo menos um depósito.',
      'Este bônus não pode ser usado junto com qualquer outra oferta ou promoção.',
    ],
  },
  {
    id: 'welcome-100',
    title: 'Bônus de Boas-Vindas 100%',
    description: 'Dobre seu primeiro depósito com 100% de bônus até R$500.',
    emoji: '🎁',
    gradient: 'from-neutral-800/60 to-black',
    accentColor: '#58B0B1',
    rollover: '5x',
    expiry: '1 dia',
    type: 'Cassino',
    status: 'available',
    requiresDeposit: true,
    rules: [
      'Válido apenas para o primeiro depósito da conta.',
      'Depósito mínimo: R$20 | Bônus máximo: R$500.',
      'Rollover de 30x sobre o valor do bônus.',
      'Prazo de 30 dias para completar o rollover.',
      'Válido em todos os jogos de cassino.',
      'Jogos de mesa contribuem 10% para o rollover.',
    ],
  },
  {
    id: 'cashback',
    title: 'Cashback Semanal 10%',
    description: 'Receba 10% de volta das suas perdas toda semana, sem rollover.',
    emoji: '💵',
    gradient: 'from-neutral-900/60 to-black',
    accentColor: '#58B0B1',
    rollover: '1x',
    expiry: '5 dias',
    type: 'Cassino',
    status: 'available',
    rules: [
      'Calculado sobre perdas líquidas de segunda a sexta.',
      'Creditado todo sábado até as 12h.',
      'Cashback máximo: R$1.000/semana.',
      'Sem rollover — saque quando quiser.',
      'Conta verificada obrigatória.',
    ],
  },
  {
    id: 'torneio',
    title: 'Bônus de Torneio',
    description: 'Participe dos torneios diários e ganhe bônus extra pelo ranking.',
    emoji: '🏆',
    gradient: 'from-neutral-900/60 to-black',
    accentColor: '#6F6F6F',
    rollover: '10x',
    expiry: '3 dias',
    type: 'Cassino',
    status: 'available',
    rules: [
      'Válido apenas para torneios participados na semana.',
      'Bônus baseado na posição final no ranking.',
      'Rollover de 10x sobre o bônus recebido.',
      'Prazo de 7 dias para utilização.',
    ],
  },
  {
    id: 'recarga-inactive',
    title: 'Bônus de Recarga — 100%',
    description: 'Saldo de R$0,00',
    emoji: '💸',
    gradient: 'from-gray-100/60 to-black',
    accentColor: '#8D8D8D',
    rollover: '1x',
    expiry: '30/06/26',
    type: 'Cassino',
    status: 'inactive',
    inactiveReason: 'Bônus cancelado pelo jogador.',
    rules: [],
  },
  {
    id: 'welcome-inactive',
    title: 'Bônus de Boas-Vindas 100%',
    description: 'Bônus expirado por não completar o rollover no prazo.',
    emoji: '⏰',
    gradient: 'from-gray-100/60 to-black',
    accentColor: '#8D8D8D',
    rollover: '30x',
    expiry: 'Expirado',
    type: 'Cassino',
    status: 'inactive',
    inactiveReason: 'Rollover não completado no prazo.',
    rules: [],
  },
];

function BonusCard({ bonus }: { bonus: Bonus }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="h-full card-3d-perspective">
      <div
        className="relative w-full h-full transition-transform duration-500 card-3d-flip dyn-transform"
        style={{ '--dyn-transform': flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' } as React.CSSProperties}
      >
        {/* ── FRONT ── */}
        <div
          className={`relative w-full h-full min-h-[280px] rounded-2xl border flex flex-col bonus-card-face ${bonus.status === 'inactive' ? 'border-black/20 opacity-55' : 'border-black/15'}`}
        >
          {/* LIVE badge */}
          {bonus.status === 'active' && (
            <div className="absolute top-0 left-0 bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-tl-2xl rounded-br-xl tracking-widest z-10">
              LIVE
            </div>
          )}

          <div className="p-5 pt-7 flex flex-col gap-4 flex-1">
            {/* Top: icon + title row */}
            <div className="flex items-start gap-4">
              {/* Left: title + desc */}
              <div className="flex-1 min-w-0">
                <h3 className="text-black font-bold text-base leading-snug mb-1.5">{bonus.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{bonus.description}</p>
              </div>
              {/* Right: emoji + Rules button stacked */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl dyn-bg-full dyn-border-full"
                  style={{ '--dyn-bg-full': bonus.accentColor + '20', '--dyn-border-full': `1px solid ${bonus.accentColor}30` } as React.CSSProperties}
                >
                  {bonus.emoji}
                </div>
                {bonus.status !== 'inactive' && (
                  <button
                    onClick={() => setFlipped(true)}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-xl border transition-colors hover:bg-black/10 whitespace-nowrap dyn-border dyn-text" style={{ '--dyn-border': bonus.accentColor + '60', '--dyn-text': bonus.accentColor } as React.CSSProperties}
                  >
                    Regras
                  </button>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/6" />

            {/* Meta row — evenly spaced */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Clock, label: 'Expira em', value: bonus.expiry },
                { icon: Tag,   label: 'Tipo',      value: bonus.type },
                { icon: Zap,   label: 'Rollover',  value: bonus.rollover },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-black/8 rounded-xl px-3 py-2.5 flex flex-col gap-1 border border-black/15">
                  <div className="flex items-center gap-1">
                    <Icon className="w-3 h-3 flex-shrink-0 dyn-text" style={{ '--dyn-text': bonus.accentColor } as React.CSSProperties} />
                    <p className="text-[9px] text-gray-700 uppercase tracking-wide">{label}</p>
                  </div>
                  <p className="text-black text-xs font-semibold truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto">
              {bonus.status === 'active' && (
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-black/10 text-gray-700 hover:bg-black/5 transition-colors flex items-center justify-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> Desistir
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 flex items-center justify-center gap-1.5 bg-[#58B0B1]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Continuar
                  </button>
                </div>
              )}
              {bonus.status === 'available' && (
                bonus.requiresDeposit ? (
                  <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity bg-[#58B0B1]">
                    DEPOSITE AGORA PARA ATIVAR
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-black/10 text-gray-700 hover:bg-black/5 transition-colors flex items-center justify-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Rejeitar
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 flex items-center justify-center gap-1.5 bg-[#58B0B1]">
                      <Gift className="w-3.5 h-3.5" /> Ativar
                    </button>
                  </div>
                )
              )}
              {bonus.status === 'inactive' && bonus.inactiveReason && (
                <p className="text-gray-400 text-xs italic text-center py-1">{bonus.inactiveReason}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── BACK — Rules ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-black/15 flex flex-col min-h-0 bonus-card-back"
        >
          <div className="p-5 flex flex-col flex-1 gap-4 min-h-0">
            <div className="flex items-center justify-between">
              <h4 className="text-black font-bold text-sm">Regras do Bônus</h4>
              <button
                onClick={() => setFlipped(false)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-black/5 hover:bg-black/10 text-gray-700 border border-black/10 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Voltar
              </button>
            </div>
            <ul className="space-y-2.5 flex-1 min-h-0 overflow-y-auto [scrollbar-width:none]">
              {bonus.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                  <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white mt-0.5 bg-[#58B0B1]">
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  onNavigateStatic?: (slug: string) => void;
  onOpenDeposit?: () => void;
}

const SECTIONS = [
  { key: 'active',    label: 'Bônus Em Uso',       icon: Star,    color: '#EF4444' },
  { key: 'available', label: 'Bônus Para Ativar',   icon: Gift,    color: '#58B0B1' },
  { key: 'inactive',  label: 'Bônus Inativos',      icon: XCircle, color: '#8D8D8D' },
] as const;

export function BonusPage({ onNavigateStatic, onOpenDeposit }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky tab bar */}
      <div className="sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] py-3 sm:pt-5 sm:pb-3">
            {SECTIONS.map(s => (
              <a key={s.key} href={`#${s.key}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-black/5 text-gray-600 hover:text-black hover:bg-black/10 transition-colors">
                <s.icon className="w-3.5 h-3.5 dyn-text" style={{ '--dyn-text': s.color } as React.CSSProperties} />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">

          {/* Coupon code input */}
          <div className="bg-[#ECECEC] rounded-2xl border border-black/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-[#58B0B1]" />
              <h3 className="text-black font-semibold text-sm">Ativar Código de Bônus</h3>
            </div>
            <p className="text-gray-500 text-xs mb-4">Possui um cupom? Insira abaixo para resgatar seu bônus.</p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ex: INSTA100"
                className="flex-1 bg-[#E3E3E3] border border-black/20 rounded-xl px-4 py-2.5 text-black text-sm placeholder-gray-600 focus:outline-none focus:border-[#58B0B1] transition-colors uppercase tracking-widest"
              />
              <button
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity whitespace-nowrap bg-[#58B0B1]"
              >
                Resgatar
              </button>
            </div>
          </div>

          {SECTIONS.map(section => {
            const sectionBonuses = bonuses.filter(b => b.status === section.key);
            if (sectionBonuses.length === 0) return null;
            return (
              <div key={section.key} id={section.key}>
                <div className="flex items-center gap-2 mb-4">
                  <section.icon className="w-5 h-5 dyn-text" style={{ '--dyn-text': section.color } as React.CSSProperties} />
                  <h2 className="text-black font-bold text-lg">{section.label}</h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-black dyn-bg dyn-text" style={{ '--dyn-bg': section.color + '33', '--dyn-text': section.color } as React.CSSProperties}>
                    {sectionBonuses.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {sectionBonuses.map(bonus => (
                    <BonusCard key={bonus.id} bonus={bonus} onOpenDeposit={onOpenDeposit} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <Footer onNavigate={onNavigateStatic} />
      </div>
    </div>
  );
}
