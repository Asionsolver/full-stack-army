import { create } from 'zustand'

interface AppState {
  darkMode: boolean
  toggleDarkMode: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedLottery: string | null
  setSelectedLottery: (id: string | null) => void
  filters: {
    dateFrom: string | null
    dateTo: string | null
    minPrice: number | null
    maxPrice: number | null
    winnerOnly: boolean | null
  }
  setFilters: (filters: Partial<AppState['filters']>) => void
  resetFilters: () => void
  pagination: {
    page: number
    limit: number
    total: number
  }
  setPagination: (pagination: Partial<AppState['pagination']>) => void
}

const initialFilters = {
  dateFrom: null,
  dateTo: null,
  minPrice: null,
  maxPrice: null,
  winnerOnly: null,
}

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
}

const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem('lottery-dark-mode')
  if (stored !== null) return JSON.parse(stored)
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useAppStore = create<AppState>((set, get) => ({
  darkMode: getInitialDarkMode(),
  toggleDarkMode: () => {
    const newValue = !get().darkMode
    localStorage.setItem('lottery-dark-mode', JSON.stringify(newValue))
    set({ darkMode: newValue })
  },
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedLottery: null,
  setSelectedLottery: (id) => set({ selectedLottery: id }),
  filters: initialFilters,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: initialFilters, searchQuery: '' }),
  pagination: initialPagination,
  setPagination: (pagination) => set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
}))