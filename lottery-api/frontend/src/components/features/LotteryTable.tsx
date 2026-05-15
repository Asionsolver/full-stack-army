import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useLotteries } from '../../hooks/useLotteries'
import { lotteryAPI } from '../../services/lottery'
import { LoadingSpinner, ErrorMessage } from '../ui'
import { SearchFilter } from '../ui/SearchFilter'
import { Pagination } from '../ui/Pagination'
import { ExportMenu } from '../ui/ExportMenu'
import type { Lottery } from '../../types'
import { useAppStore } from '../../store'

interface LotteryTableProps {
  refreshTrigger?: number
}

export const LotteryTable = ({ refreshTrigger = 0 }: LotteryTableProps) => {
  const { lotteries, allLotteries, totalCount, loading, error, refetch, deleteLottery } = useLotteries(refreshTrigger)
  const { pagination, setPagination } = useAppStore()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [deleting, setDeleting] = useState(false)

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this lottery?')) return
    try {
      deleteLottery(id)
    } catch {
      toast.error('Failed to delete lottery')
    }
  }

  const handleSelectAll = () => {
    if (selectedIds.size === allLotteries.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(allLotteries.map((l: Lottery) => l.id)))
    }
  }

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} lotteries?`)) return

    setDeleting(true)
    try {
      for (const id of selectedIds) {
        await lotteryAPI.delete(id)
      }
      setSelectedIds(new Set())
      refetch()
      toast.success(`Deleted ${selectedIds.size} lotteries successfully!`)
    } catch {
      toast.error('Failed to delete lotteries')
    } finally {
      setDeleting(false)
    }
  }

  const handlePageChange = (page: number) => {
    setPagination({ page })
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error instanceof Error ? error.message : 'Failed to load'} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-2xl" />
        <div className="relative">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-gray-200 dark:via-indigo-300 dark:to-purple-300">
                All Lotteries
              </h2>
              <p className="text-slate-500 mt-1 dark:text-slate-400">{totalCount} total tickets</p>
            </div>
            <div className="flex gap-3">
              {selectedIds.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50 text-sm font-medium transition-all"
                >
                  {deleting ? 'Deleting...' : `Delete (${selectedIds.size})`}
                </button>
              )}
              <ExportMenu data={allLotteries} disabled={allLotteries.length === 0} />
            </div>
          </div>

          <div className="mt-4">
            <SearchFilter onExport={() => {}} showExport={false} />
          </div>
        </div>
      </div>

      {allLotteries.length === 0 ? (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl" />
          <div className="relative text-center py-12 text-slate-400 bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50">
            No lotteries found
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl" />
          <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/30 border-b border-slate-700/50">
                  <tr>
                    <th className="px-4 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === allLotteries.length && allLotteries.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-slate-500 text-indigo-500 focus:ring-indigo-500 cursor-pointer accent-indigo-500 bg-slate-700"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {lotteries.map((lottery: Lottery) => (
                    <tr key={lottery.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(lottery.id)}
                          onChange={() => handleSelectOne(lottery.id)}
                          className="w-4 h-4 rounded border-slate-500 text-indigo-500 focus:ring-indigo-500 cursor-pointer accent-indigo-500 bg-slate-700"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-300">{lottery.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{lottery.username}</td>
                      <td className="px-6 py-4 text-sm font-medium text-emerald-400">${lottery.price}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(lottery.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {lottery.isWinner ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            Winner
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-400">
                            Regular
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(lottery.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={Math.ceil(totalCount / pagination.limit)}
              onPageChange={handlePageChange}
              onNextPage={() => setPagination({ page: pagination.page + 1 })}
              onPrevPage={() => setPagination({ page: pagination.page - 1 })}
              hasNextPage={pagination.page < Math.ceil(totalCount / pagination.limit)}
              hasPrevPage={pagination.page > 1}
              totalItems={totalCount}
              itemsPerPage={pagination.limit}
            />
          </div>
        </div>
      )}
    </div>
  )
}