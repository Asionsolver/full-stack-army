import { useState } from 'react'
import { lotteryAPI } from '../../services/lottery'
import type { Lottery } from '../../types'

interface DrawWinnersProps {
  onSuccess: () => void
}

export const DrawWinners = ({ onSuccess }: DrawWinnersProps) => {
  const [count, setCount] = useState('1')
  const [winners, setWinners] = useState<Lottery[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDraw = async () => {
    setError('')
    setLoading(true)
    try {
      const result = await lotteryAPI.drawWinners(parseInt(count))
      setWinners(result.winners)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to draw winners')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-2xl blur-xl" />
      <div className="relative bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)] shadow-xl">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-sm">🎲</span>
          Draw Winners
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Number of Winners</label>
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm backdrop-blur-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleDraw}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Drawing...' : '🎲 Draw Winners'}
          </button>
          {winners.length > 0 && (
            <div className="relative mt-6 p-5 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-xl border border-amber-500/20 backdrop-blur-xl overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500/20 rounded-full blur-2xl" />
              <div className="relative">
                <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎉</span> Winners
                </h3>
                <div className="space-y-3">
                  {winners.map((winner, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-[var(--bg-secondary)]/30 rounded-xl">
                      <span className="font-medium text-[var(--text-primary)]">{winner.username}</span>
                      <span className="text-[var(--text-muted)] font-mono text-sm">{winner.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}