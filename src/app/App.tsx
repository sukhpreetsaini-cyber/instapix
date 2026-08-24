import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RecentWinners } from './components/RecentWinners';
import { PromoCards } from './components/PromoCards';
import { HomeCategoryBar } from './components/HomeCategoryBar';
import { QuickPlayRow } from './components/QuickPlayRow';
// import { Categories } from './components/Categories'; // hidden on home page per request
import { BigGameRow } from './components/BigGameRow';
import { SmallGameRow } from './components/SmallGameRow';
import { PromotionsSection } from './components/PromotionsSection';
import { SEOContent } from './components/SEOContent';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { GameCategoryPage } from './pages/GameCategoryPage';
import type { PageType } from './pages/GameCategoryPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { PromoDetailPage } from './pages/PromoDetailPage';
import { StaticPage } from './pages/StaticPage';
import { staticPages } from './data/staticPages';
import { MyAccountPage } from './pages/MyAccountPage';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { BonusPage } from './pages/BonusPage';
import { ReferPage } from './pages/ReferPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { TournamentDetailPage } from './pages/TournamentDetailPage';
import { RewardsPage } from './pages/RewardsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProvidersSection } from './components/ProvidersSection';
import { Star, Flame, Clock, Sparkles, Search, X } from 'lucide-react';

type Page = PageType | 'home' | 'promocoes' | 'minha-conta' | 'bonus' | 'refer' | 'torneios' | 'recompensas' | 'login' | 'cadastro' | 'esqueci-senha' | 'notificacoes';

import imgMrTreasure from '../imports/mr-treasures-fortune-featured.png';
import imgKnockout from '../imports/Knockout-riches-featured.png';
import imgFortuneMouse from '../imports/fortune-mouse-featured.png';
import imgDoomsday from '../imports/doomsday-rampage-featured.png';
import imgSweetBonanza from '../imports/SweetBonanza-featured.png';
import imgBuffaloKing from '../imports/Buffalo-King-featured.png';
import imgGatesOlympus from '../imports/Gates-of-Olympus-featured.png';
import imgPenaltyShoot from '../imports/penalty-shoot-out-featured.png';
import imgOx from '../imports/ox-featured.png';
import imgZeus from '../imports/Zeus-lightning-featured.png';

const featuredGames = [
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

const popularGames = [
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

const slotsGames = [
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
];

const liveGames = [
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

const tableGames = [
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showWinners, setShowWinners] = useState(true);
  const [mobileWinnersOpen, setMobileWinnersOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>('home');
  const [activePromoId, setActivePromoId] = useState<string | null>(null);
  const [activeStaticSlug, setActiveStaticSlug] = useState<string | null>(null);
  const [accountSection, setAccountSection] = useState('minha-conta');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'cadastro' | 'esqueci-senha' | null>(null);
  const [bottomNavShrunk, setBottomNavShrunk] = useState(false);

  // Bottom nav shrinks on scroll up, returns to normal size on scroll down.
  useEffect(() => {
    const lastY = { current: window.scrollY };
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return; // ignore tiny/jittery movement
      setBottomNavShrunk(delta < 0 && y > 40);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ACCOUNT_SECTIONS = ['minha-conta','carteira','apostas','limites','pausas-suspensoes','seguranca','contas-bancarias'];
  const BONUS_SLUGS = ['bonus'];
  const AUTH_PAGES = ['login', 'cadastro', 'esqueci-senha'];

  const navigate = (page: string) => {
    if (AUTH_PAGES.includes(page)) {
      setAuthModal(page as 'login' | 'cadastro' | 'esqueci-senha');
      return;
    }
    setAuthModal(null);
    if (ACCOUNT_SECTIONS.includes(page)) {
      setActivePage('minha-conta');
      setAccountSection(page);
    } else {
      setActivePage(page as Page);
    }
    setActivePromoId(null);
    setActiveStaticSlug(null);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAuthModal = () => setAuthModal(null);

  const openPromo = (id: string) => {
    setActivePromoId(id);
    setActiveStaticSlug(null);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStaticPage = (slug: string) => {
    setActiveStaticSlug(slug);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const winnersVisibleHere = showWinners && activePage !== 'promocoes' && !activeStaticSlug && activePage !== 'minha-conta';

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <Header
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onNavigate={navigate}
        mobileSidebarOpen={mobileSidebarOpen}
        onOpenDeposit={() => setDepositOpen(true)}
        showWinners={showWinners}
        onToggleWinners={() => setShowWinners(!showWinners)}
        onOpenMobileWinners={() => setMobileWinnersOpen(true)}
        mobileWinnersOpen={mobileWinnersOpen}
      />

      <div className="flex-1 pt-[82px]">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden fixed top-4 right-4 z-[71] w-9 h-9 rounded-full bg-white shadow-md border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4 text-black" />
            </button>
          </>
        )}

        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed top-0 left-0 h-screen z-[70] transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full">
            <Sidebar
              activePage={activePage}
              onNavigate={navigate}
              onNavigateStatic={openStaticPage}
            />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed top-0 left-0 h-full z-40">
          <Sidebar
            activePage={activePage}
            onNavigate={navigate}
            onNavigateStatic={openStaticPage}
          />
        </div>

        <main
          className={`page-glow-bg lg:ml-64 ${winnersVisibleHere ? 'xl:mr-80' : ''} overflow-y-auto min-h-screen transition-all duration-300 pb-20 lg:pb-0`}
        >
          {activePage === 'notificacoes' ? (
            <NotificationsPage onNavigateStatic={openStaticPage} />
          ) : activePage === 'recompensas' ? (
            <RewardsPage onNavigateStatic={openStaticPage} />
          ) : activePage === 'torneios' && selectedTournamentId ? (
            <TournamentDetailPage
              tournamentId={selectedTournamentId}
              onBack={() => { setSelectedTournamentId(null); window.scrollTo({ top: 0 }); }}
              onSelectTournament={(id) => { setSelectedTournamentId(id); window.scrollTo({ top: 0 }); }}
              onNavigateStatic={openStaticPage}
            />
          ) : activePage === 'torneios' ? (
            <TournamentsPage
              onGoHome={() => navigate('home')}
              onNavigateStatic={openStaticPage}
              onSelectTournament={(id) => { setSelectedTournamentId(id); window.scrollTo({ top: 0 }); }}
            />
          ) : activePage === 'refer' ? (
            <ReferPage onNavigateStatic={openStaticPage} />
          ) : activePage === 'bonus' ? (
            <BonusPage onNavigateStatic={openStaticPage} onOpenDeposit={() => setDepositOpen(true)} />
          ) : activePage === 'minha-conta' ? (
            <MyAccountPage
              onGoHome={() => navigate('home')}
              onNavigateStatic={openStaticPage}
              initialSection={accountSection}
              onOpenDeposit={() => setDepositOpen(true)}
              onOpenWithdraw={() => setWithdrawOpen(true)}
            />
          ) : activeStaticSlug ? (
            <StaticPage
              page={staticPages.find(p => p.slug === activeStaticSlug)!}
              onGoHome={() => navigate('home')}
              onNavigate={openStaticPage}
            />
          ) : activePage === 'promocoes' && activePromoId ? (
            <PromoDetailPage
              promoId={activePromoId}
              onBack={() => { setActivePromoId(null); window.scrollTo({ top: 0 }); }}
              onGoHome={() => navigate('home')}
              onNavigateStatic={openStaticPage}
            />
          ) : activePage === 'promocoes' ? (
            <PromotionsPage onOpenPromo={openPromo} onNavigateStatic={openStaticPage} />
          ) : activePage === 'home' ? (
            <>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col">
                {/* <Categories /> — hidden per request */}

                {/* Desktop: 3 small banners, then category bar + search, then the main banner */}
                <div className="order-4 lg:order-1">
                  <QuickPlayRow onNavigate={navigate} />
                </div>

                <div className="order-2 lg:order-2">
                  <HomeCategoryBar onNavigate={navigate} />
                </div>

                <div className="order-1 lg:order-3">
                  <PromoCards />
                </div>

                {/* Search bar — mobile only, desktop has one in the category bar */}
                <div className="order-3 relative mt-3 mb-5 lg:hidden">
                  <input
                    type="text"
                    placeholder="Buscar jogos, categorias..."
                    className="w-full bg-white text-black placeholder-gray-600 pl-4 pr-10 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#58B0B1] border border-black/15"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                </div>

                <div className="order-5 lg:order-4">
                  <BigGameRow
                    title="Jogos em Destaque"
                    icon={<Star className="w-4 h-4 text-black fill-white" />}
                    games={featuredGames}
                  />
                  <SmallGameRow
                    title="Mais Populares"
                    icon={<Flame className="w-4 h-4 text-black fill-white" />}
                    games={popularGames}
                  />
                  <SmallGameRow
                    title="Slots em Alta"
                    icon={<Sparkles className="w-4 h-4 text-black fill-white" />}
                    games={slotsGames}
                  />
                  <BigGameRow
                    title="Cassino Ao Vivo"
                    icon={<Star className="w-4 h-4 text-black fill-white" />}
                    games={liveGames}
                    liveTag
                  />
                  <SmallGameRow
                    title="Jogos de Mesa"
                    icon={<Clock className="w-4 h-4 text-black fill-white" />}
                    games={tableGames}
                  />
                  <ProvidersSection />
                  <PromotionsSection onOpenPromo={(id) => { navigate('promocoes'); openPromo(id); }} onSeeAll={() => navigate('promocoes')} />
                  <SEOContent />
                </div>
              </div>
              <Footer onNavigate={openStaticPage} />
            </>
          ) : (
            <GameCategoryPage page={activePage as PageType} onNavigateStatic={openStaticPage} />
          )}
        </main>

        {/* Desktop Recent Winners rail */}
        {winnersVisibleHere && (
          <div className="hidden xl:block">
            <RecentWinners onClose={() => setShowWinners(false)} />
          </div>
        )}

        {/* Mobile Recent Winners slide-over */}
        {mobileWinnersOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[60] xl:hidden"
              onClick={() => setMobileWinnersOpen(false)}
            />
            <div className="xl:hidden fixed top-0 right-0 z-[70]">
              <RecentWinners onClose={() => setMobileWinnersOpen(false)} fullHeight />
            </div>
          </>
        )}
      </div>

      <MobileBottomBar
        activePage={activePage}
        onNavigate={navigate}
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        shrunk={bottomNavShrunk}
      />

      {depositOpen && <DepositModal onClose={() => setDepositOpen(false)} />}
      {withdrawOpen && <WithdrawModal onClose={() => setWithdrawOpen(false)} />}

      {authModal === 'login' && <LoginPage onNavigate={navigate} onClose={closeAuthModal} />}
      {authModal === 'cadastro' && <RegisterPage onNavigate={navigate} onClose={closeAuthModal} />}
      {authModal === 'esqueci-senha' && <ForgotPasswordPage onNavigate={navigate} onClose={closeAuthModal} />}
    </div>
  );
}
