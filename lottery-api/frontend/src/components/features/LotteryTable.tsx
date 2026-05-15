import { useState } from 'react';
import { useLotteries } from '../../hooks/useLotteries';
import { lotteryAPI } from '../../services/lottery';
import { LoadingSpinner, ErrorMessage } from '../ui';
import type { Lottery } from '../../types';

interface LotteryTableProps {
  refreshTrigger?: number;
}

export const LotteryTable = ({ refreshTrigger = 0 }: LotteryTableProps) => {
  const { lotteries, loading, error, deleteLottery, refetch } = useLotteries(refreshTrigger);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lottery?')) return;
    try {
      await deleteLottery(id);
    } catch {
      alert('Failed to delete lottery');
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredLotteries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredLotteries.map((l) => l.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} lotteries?`)) return;
    
    setDeleting(true);
    try {
      for (const id of selectedIds) {
        await lotteryAPI.delete(id);
      }
      setSelectedIds(new Set());
      refetch();
    } catch {
      alert('Failed to delete lotteries');
    } finally {
      setDeleting(false);
    }
  };

  const filteredLotteries = lotteries.filter(
    (l: Lottery) =>
      l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Lotteries</h2>
          <p className="text-gray-500">{lotteries.length} total tickets</p>
        </div>
        <div className="flex gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
            >
              {deleting ? 'Deleting...' : `Delete (${selectedIds.size})`}
            </button>
          )}
          <input
            type="text"
            placeholder="Search by ID or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {filteredLotteries.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
          No lotteries found
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filteredLotteries.length && filteredLotteries.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLotteries.map((lottery: Lottery) => (
                  <tr key={lottery.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(lottery.id)}
                        onChange={() => handleSelectOne(lottery.id)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
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