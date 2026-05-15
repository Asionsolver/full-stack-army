import { useState } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { DrawWinners, SellForm, WinnerList } from './components';
import { LotteriesPage } from './pages/LotteriesPage';

type Tab = 'dashboard' | 'lotteries' | 'sell' | 'draw' | 'winners';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const showSidebar = activeTab !== 'dashboard' && activeTab !== 'lotteries';

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'lotteries', label: 'Lotteries', icon: '🎫' },
    { id: 'sell', label: 'Sell', icon: '💵' },
    { id: 'draw', label: 'Draw', icon: '🎲' },
    { id: 'winners', label: 'Winners', icon: '🏆' },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'lotteries':
        return <LotteriesPage refreshTrigger={refreshTrigger} />;
      case 'sell':
        return <SellForm onSuccess={handleRefresh} />;
      case 'draw':
        return <DrawWinners onSuccess={handleRefresh} />;
      case 'winners':
        return <WinnerList refreshTrigger={refreshTrigger} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNzI5M2YiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
      
      <nav className="relative bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-sm" />
                <div className="relative flex items-center gap-2 px-3 py-1.5">
                  <span className="text-2xl">🎰</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Lottery Admin
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="mr-1.5">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">{renderContent()}</div>
            <div className="space-y-6">
              <WinnerList refreshTrigger={refreshTrigger} />
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                    Quick Stats
                  </h3>
                  <p className="text-sm text-slate-400">Check the dashboard for detailed statistics</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </main>

      <footer className="relative border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-xl mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-slate-400">
          Lottery Management System © 2026
        </div>
      </footer>
    </div>
  );
}

export default App;