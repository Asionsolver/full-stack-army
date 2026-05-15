import { useWinners } from '../../hooks/useLotteries'
import { LoadingSpinner, ErrorMessage } from '../ui'

interface WinnerListProps {
  refreshTrigger?: number
}

export const WinnerList = ({ refreshTrigger = 0 }: WinnerListProps) => {
  const { data, isLoading, error, refetch } = useWinners(refreshTrigger)

  const winners = data?.winnersNames ?? []

  if (isLoading) return <LoadingSpinner size="sm" />
  if (error) return <ErrorMessage message={error instanceof Error ? error.message : 'Failed to load winners'} onRetry={refetch} />

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-2xl blur-xl" />
      <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          🏆 Winner List
        </h2>
        {winners.length === 0 ? (
          <p className="text-slate-400 text-center py-6">No winners yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {winners.map((winner: string, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 rounded-full text-sm font-medium border border-amber-500/30 hover:scale-105 transition-transform cursor-default"
              >
                {winner}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}