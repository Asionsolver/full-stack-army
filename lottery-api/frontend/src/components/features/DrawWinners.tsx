import { useState } from 'react';
import { lotteryAPI } from '../../services/lottery';
import type { Lottery } from '../../types';

interface DrawWinnersProps {
  onSuccess: () => void;
}

export const DrawWinners = ({ onSuccess }: DrawWinnersProps) => {
  const [count, setCount] = useState('1');
  const [winners, setWinners] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDraw = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await lotteryAPI.drawWinners(parseInt(count));
      setWinners(result.winners);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to draw winners');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Draw Winners</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Winners</label>
          <input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
        <button
          onClick={handleDraw}
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 transition-all"
        >
          {loading ? 'Drawing...' : '🎲 Draw Winners'}
        </button>
        {winners.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-3">🎉 Winners</h3>
            <div className="space-y-2">
              {winners.map((winner, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-800">{winner.username}</span>
                  <span className="text-gray-500 font-mono">{winner.id}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};