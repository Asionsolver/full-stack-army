import { DashboardStats } from '../components'
import { DashboardCharts } from '../components/ui/Charts'
import { useStatistics } from '../hooks/useLotteries'

interface DashboardPageProps {
  refreshTrigger?: number
}

export const DashboardPage = ({ refreshTrigger: _refreshTrigger = 0 }: DashboardPageProps) => {
  const { data: statistics, isLoading } = useStatistics()

  const hasPriceData = Boolean(
    statistics?.priceDistribution && Object.keys(statistics.priceDistribution).length > 0
  )
  
  const hasUserData = Boolean(
    statistics?.userDistribution && Object.keys(statistics.userDistribution).length > 0
  )

  const hasChartsData = hasPriceData || hasUserData

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-xl">🎰</span>
            </div>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-400 px-2 py-1 rounded-full">LIVE</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 dark:from-slate-200 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-[var(--text-tertiary)] mt-1">Real-time overview of your lottery system</p>
        </div>
      </div>

      <DashboardStats />

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)] animate-pulse">
            <div className="h-6 bg-[var(--bg-secondary)] rounded w-1/3 mb-4"></div>
            <div className="h-[300px] bg-[var(--bg-secondary)] rounded"></div>
          </div>
          <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)] animate-pulse">
            <div className="h-6 bg-[var(--bg-secondary)] rounded w-1/3 mb-4"></div>
            <div className="h-[300px] bg-[var(--bg-secondary)] rounded"></div>
          </div>
        </div>
      )}

      {!isLoading && hasChartsData && (
        <DashboardCharts
          priceDistribution={statistics?.priceDistribution}
          userDistribution={statistics?.userDistribution}
        />
      )}

      {!isLoading && !hasChartsData && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl" />
          <div className="relative text-center py-12 text-[var(--text-tertiary)] bg-[var(--bg-card)]/30 backdrop-blur-xl rounded-2xl border border-[var(--border-color)]">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-lg font-medium">No chart data available</p>
            <p className="text-sm mt-2">Add some lotteries to see analytics</p>
          </div>
        </div>
      )}
    </div>
  )
}