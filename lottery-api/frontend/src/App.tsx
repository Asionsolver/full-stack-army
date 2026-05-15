import { useState } from 'react';
import { Dashboard, LotteryList, SellForm, DrawWinners, WinnerList } from './components/Dashboard';

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
        return <Dashboard />;
      case 'lotteries':
        return <LotteryList refreshTrigger={refreshTrigger} />;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🎰</span>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Lottery Admin
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">{renderContent()}</div>
            <div className="space-y-6">
              <WinnerList refreshTrigger={refreshTrigger} />
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">Quick Stats</h3>
                <p className="text-sm text-gray-500">Check the dashboard for detailed statistics</p>
              </div>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          Lottery Management System © 2026
        </div>
      </footer>
    </div>
  );
}

export default App;