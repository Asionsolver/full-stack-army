import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { lotteryAPI } from '../services/lottery'
import { useAppStore } from '../store'
import toast from 'react-hot-toast'

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [countData, salesData, winnersData] = await Promise.all([
        lotteryAPI.getCount(),
        lotteryAPI.getTotalSales(),
        lotteryAPI.getWinnersNames(),
      ])
      return {
        count: countData.count,
        totalSales: salesData.totalSales,
        winners: winnersData.winnersNames.length,
      }
    },
    staleTime: 1000 * 30,
    refetchInterval: 5000,
  })
}

export const useStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await lotteryAPI.getStatistics()
      return response.statistics
    },
    staleTime: 1000 * 60,
  })
}

export const useLotteries = (refreshTrigger = 0) => {
  const queryClient = useQueryClient()
  const { filters, searchQuery, pagination } = useAppStore()

  const lotteriesQuery = useQuery({
    queryKey: ['lotteries', refreshTrigger],
    queryFn: () => lotteryAPI.getAll(),
    staleTime: 1000 * 30,
  })

  const filteredData = useMemo(() => {
    if (!lotteriesQuery.data) return []

    let data = lotteriesQuery.data.lotteries

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      data = data.filter(
        (l) => l.username.toLowerCase().includes(query) || l.id.toLowerCase().includes(query)
      )
    }

    if (filters.dateFrom) {
      data = data.filter((l) => new Date(l.createdAt) >= new Date(filters.dateFrom!))
    }
    if (filters.dateTo) {
      data = data.filter((l) => new Date(l.createdAt) <= new Date(filters.dateTo!))
    }
    if (filters.minPrice !== null) {
      data = data.filter((l) => l.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== null) {
      data = data.filter((l) => l.price <= filters.maxPrice!)
    }
    if (filters.winnerOnly) {
      data = data.filter((l) => l.isWinner)
    }

    return data
  }, [lotteriesQuery.data, searchQuery, filters])

  const paginatedData = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit
    return filteredData.slice(start, start + pagination.limit)
  }, [filteredData, pagination.page, pagination.limit])

  const deleteMutation = useMutation({
    mutationFn: (id: string) => lotteryAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lotteries'] })
      toast.success('Lottery deleted successfully!')
    },
    onError: () => {
      toast.error('Failed to delete lottery')
    },
  })

  return {
    lotteries: paginatedData,
    allLotteries: filteredData,
    totalCount: filteredData.length,
    loading: lotteriesQuery.isLoading,
    error: lotteriesQuery.error,
    refetch: lotteriesQuery.refetch,
    deleteLottery: deleteMutation.mutate,
  }
}

export const useWinners = (refreshTrigger = 0) => {
  return useQuery({
    queryKey: ['winners', refreshTrigger],
    queryFn: () => lotteryAPI.getWinnersNames(),
    staleTime: 1000 * 30,
    refetchInterval: 5000,
  })
}

export const useLotteryById = (id: string) => {
  return useQuery({
    queryKey: ['lottery', id],
    queryFn: () => lotteryAPI.getById(id),
    enabled: !!id,
  })
}