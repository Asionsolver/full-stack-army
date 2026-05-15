import { Search, X, Download } from 'lucide-react'
import { useAppStore } from '../../store'

interface SearchFilterProps {
  onExport?: () => void
  showExport?: boolean
}

export const SearchFilter = ({ onExport, showExport = true }: SearchFilterProps) => {
  const { searchQuery, setSearchQuery, filters, setFilters, resetFilters } = useAppStore()

  const hasActiveFilters = filters.dateFrom || filters.dateTo || filters.minPrice || filters.maxPrice || filters.winnerOnly !== null

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => setFilters({ dateFrom: e.target.value || null })}
            className="px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <span className="text-slate-400">to</span>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => setFilters({ dateTo: e.target.value || null })}
            className="px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        <label className="flex items-center gap-2 px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-700/50 transition-all">
          <input
            type="checkbox"
            checked={filters.winnerOnly ?? false}
            onChange={(e) => setFilters({ winnerOnly: e.target.checked ? true : null })}
            className="w-4 h-4 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-slate-300 text-sm whitespace-nowrap">Winners only</span>
        </label>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="px-3 py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}

        {showExport && onExport && (
          <button
            onClick={onExport}
            className="px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchFilter