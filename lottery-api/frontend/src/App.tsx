import { lazy, Suspense, useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppStore } from './store'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { ConnectionStatus } from './components/ui/ConnectionStatus'
import { useWebSocket } from './hooks/useWebSocket'

const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const LotteriesPage = lazy(() => import('./pages/LotteriesPage').then(m => ({ default: m.LotteriesPage })))
const WinnerList = lazy(() => import('./components/features/WinnerList').then(m => ({ default: m.WinnerList })))
const SellForm = lazy(() => import('./components/features/SellForm').then(m => ({ default: m.SellForm })))
const DrawWinners = lazy(() => import('./components/features/DrawWinners').then(m => ({ default: m.DrawWinners })))

type Tab = 'dashboard' | 'lotteries' | 'sell' | 'draw' | 'winners'

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
  </div>
)

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const { darkMode } = useAppStore()

  const { isConnected } = useWebSocket({
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws',
    onMessage: (data: unknown) => {
      const msg = data as { type?: string }
      if (msg.type === 'new_lottery' || msg.type === 'winner_drawn') {
        setRefreshTrigger((prev) => prev + 1)
        toast.success('New data received!', { icon: '🔔' })
      }
    },
    reconnectAttempts: 3,
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1)

  const showSidebar = activeTab !== 'dashboard' && activeTab !== 'lotteries'

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'lotteries', label: 'Lotteries', icon: '🎫' },
    { id: 'sell', label: 'Sell', icon: '💵' },
    { id: 'draw', label: 'Draw', icon: '🎲' },
    { id: 'winners', label: 'Winners', icon: '🏆' },
  ] as const

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage refreshTrigger={refreshTrigger} />
      case 'lotteries':
        return <LotteriesPage refreshTrigger={refreshTrigger} />
      case 'sell':
        return <SellForm onSuccess={handleRefresh} />
      case 'draw':
        return <DrawWinners onSuccess={handleRefresh} />
      case 'winners':
        return <WinnerList refreshTrigger={refreshTrigger} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNzI5M2YiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 dark:opacity-20" />
      
      <nav className="relative bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-color)] sticky top-0 z-50 transition-colors duration-300">
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
              <ConnectionStatus isConnected={isConnected} />
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="mr-1.5">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<PageLoader />}>
          {showSidebar ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">{renderContent()}</div>
              <div className="space-y-6">
                <WinnerList refreshTrigger={refreshTrigger} />
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                  <div className="relative bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)]">
                    <h3 className="font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                      Quick Stats
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)]">Check the dashboard for detailed statistics</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </Suspense>
      </main>

      <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-card)]/50 backdrop-blur-xl mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-[var(--text-tertiary)]">
          Lottery Management System © 2026
        </div>
      </footer>
    </div>
  )
}

export default App