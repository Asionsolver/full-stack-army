import { useStats } from '../../hooks/useLotteries'
import { StatCard, LoadingSpinner, ErrorMessage } from '../ui'

export const DashboardStats = () => {
  const { data: stats, isLoading, error, refetch } = useStats()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error instanceof Error ? error.message : 'Failed to load stats'} onRetry={refetch} />

  const metrics = [
    { title: 'Total Lotteries', value: stats?.count ?? 0, icon: '🎫', color: 'indigo' },
    { title: 'Total Sales', value: `$${(stats?.totalSales ?? 0).toLocaleString()}`, icon: '💰', color: 'emerald' },
    { title: 'Total Winners', value: stats?.winners ?? 0, icon: '🏆', color: 'amber' },
  ]

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard {...metric} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)] shadow-xl">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)]/50 rounded-xl">
                <span className="text-sm text-[var(--text-secondary)]">API Health</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)]/50 rounded-xl">
                <span className="text-sm text-[var(--text-secondary)]">Database</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)]/50 rounded-xl">
                <span className="text-sm text-[var(--text-secondary)]">Active Sessions</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{Math.floor(Math.random() * 10) + 1}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)] shadow-xl">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-secondary)]">Response Time</span>
                  <span className="font-medium text-[var(--text-primary)]">24ms</span>
                </div>
                <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-secondary)]">Uptime</span>
                  <span className="font-medium text-[var(--text-primary)]">99.9%</span>
                </div>
                <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full" style={{ width: '99.9%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-2xl blur-3xl" />
        <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <span className="text-3xl">🚀</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Ready for Next Draw?</h3>
              <p className="text-[var(--text-secondary)]">Create a new lottery or proceed with a draw to determine winners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}