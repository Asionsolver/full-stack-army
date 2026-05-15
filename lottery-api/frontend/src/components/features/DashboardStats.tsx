import { useStats } from '../../hooks/useLotteries';
import { StatCard, LoadingSpinner, ErrorMessage } from '../ui';

export const DashboardStats = () => {
  const { stats, loading, error, refetch } = useStats();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Lotteries" value={stats.count} icon="🎫" color="bg-indigo-100" />
      <StatCard title="Total Sales" value={`$${stats.totalSales.toLocaleString()}`} icon="💰" color="bg-green-100" />
      <StatCard title="Total Winners" value={stats.winners} icon="🏆" color="bg-yellow-100" />
    </div>
  );
};