import { useState, useEffect, useCallback } from 'react';
import { lotteryAPI } from '../services/lottery';
import type { Lottery } from '../types';

interface UseStatsReturn {
  stats: { count: number; totalSales: number; winners: number };
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useStats = (): UseStatsReturn => {
  const [stats, setStats] = useState({ count: 0, totalSales: 0, winners: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
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
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

interface UseLotteriesReturn {
  lotteries: Lottery[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  deleteLottery: (id: string) => Promise<void>;
}

export const useLotteries = (refreshTrigger = 0): UseLotteriesReturn => {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLotteries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await lotteryAPI.getAll();
      setLotteries(data.lotteries);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lotteries');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLottery = async (id: string) => {
    await lotteryAPI.delete(id);
    setLotteries((prev) => prev.filter((l) => l.id !== id));
  };

  useEffect(() => {
    fetchLotteries();
  }, [fetchLotteries, refreshTrigger]);

  return { lotteries, loading, error, refetch: fetchLotteries, deleteLottery };
};

interface UseWinnersReturn {
  winners: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWinners = (refreshTrigger = 0): UseWinnersReturn => {
  const [winners, setWinners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWinners = useCallback(async () => {
    try {
      setLoading(true);
      const data = await lotteryAPI.getWinnersNames();
      setWinners(data.winnersNames);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch winners');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWinners();
  }, [fetchWinners, refreshTrigger]);

  return { winners, loading, error, refetch: fetchWinners };
};