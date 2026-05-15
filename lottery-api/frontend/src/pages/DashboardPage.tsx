import { DashboardStats } from '../components'
import { DashboardCharts } from '../components/ui/Charts'
import { useStatistics } from '../hooks/useLotteries'

interface DashboardPageProps {
  refreshTrigger?: number // Used for React Query invalidation
}

export const DashboardPage = ({ refreshTrigger: _refreshTrigger = 0 }: DashboardPageProps) => {
  const { data: statistics, isLoading } = useStatistics()

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-xl">🎰</span>
            </div>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full dark:text-indigo-400 dark:bg-indigo-900/50">LIVE</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-gray-200 dark:via-indigo-300 dark:to-purple-300">
            Dashboard
          </h2>
          <p className="text-gray-500 mt-1 dark:text-gray-400">Real-time overview of your lottery system</p>
        </div>
      </div>

      <DashboardStats />

      {!isLoading && statistics && (
        <DashboardCharts
          priceDistribution={statistics.priceDistribution}
          userDistribution={statistics.userDistribution}
        />
      )}
    </div>
  )
}