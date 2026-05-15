import { useState, useEffect } from 'react';
import { lotteryAPI } from '../services/lottery';
import type { Lottery } from '../types';


interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </div>
);

export const Dashboard = () => {
  const [stats, setStats] = useState({ count: 0, totalSales: 0, winners: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [countData, salesData, winnersData] = await Promise.all([
          lotteryAPI.getCount(),
          lotteryAPI.getTotalSales(),
          lotteryAPI.getWinnersNames(),
        ]);
        setStats({
          count: countData.count,
          totalSales: salesData.totalSales,
          winners: winnersData.winnersNames.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Overview of your lottery system</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Lotteries" value={stats.count} icon="🎫" color="bg-indigo-100" />
        <StatCard title="Total Sales" value={`$${stats.totalSales.toLocaleString()}`} icon="💰" color="bg-green-100" />
        <StatCard title="Total Winners" value={stats.winners} icon="🏆" color="bg-yellow-100" />
      </div>
    </div>
  );
};

interface LotteryListProps {
  refreshTrigger?: number;
}

export const LotteryList = ({ refreshTrigger }: LotteryListProps) => {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLotteries = async () => {
    try {
      const data = await lotteryAPI.getAll();
      setLotteries(data.lotteries);
    } catch (error) {
      console.error('Failed to fetch lotteries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotteries();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lottery?')) return;
    try {
      await lotteryAPI.delete(id);
      setLotteries(lotteries.filter((l) => l.id !== id));
    } catch (error) {
      alert('Failed to delete lottery');
    }
  };

  const filteredLotteries = lotteries.filter(
    (l) =>
      l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Lotteries</h2>
          <p className="text-gray-500">{lotteries.length} total tickets</p>
        </div>
        <input
          type="text"
          placeholder="Search by ID or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      {filteredLotteries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No lotteries found</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLotteries.map((lottery) => (
                  <tr key={lottery.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{lottery.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{lottery.username}</td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">${lottery.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(lottery.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(lottery.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

interface SellFormProps {
  onSuccess: () => void;
}

export const SellForm = ({ onSuccess }: SellFormProps) => {
  const [formData, setFormData] = useState({ username: '', price: '', quantity: '1' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const price = parseFloat(formData.price);
      const quantity = parseInt(formData.quantity);
      if (quantity > 1) {
        await lotteryAPI.bulkSell(formData.username, price, quantity);
      } else {
        await lotteryAPI.sell(formData.username, price);
      }
      setFormData({ username: '', price: '', quantity: '1' });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sell lottery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Sell Lottery</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter username"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Selling...' : 'Sell Lottery'}
        </button>
      </form>
    </div>
  );
};

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

interface WinnerListProps {
  refreshTrigger?: number;
}

export const WinnerList = ({ refreshTrigger }: WinnerListProps) => {
  const [winners, setWinners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const data = await lotteryAPI.getWinnersNames();
        setWinners(data.winnersNames);
      } catch (error) {
        console.error('Failed to fetch winners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWinners();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Winner List</h2>
      {winners.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No winners yet</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {winners.map((winner, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
            >
              {winner}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};