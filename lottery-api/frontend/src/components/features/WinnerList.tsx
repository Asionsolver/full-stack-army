import { useWinners } from '../../hooks/useLotteries';
import { LoadingSpinner, ErrorMessage } from '../ui';

interface WinnerListProps {
  refreshTrigger?: number;
}

export const WinnerList = ({ refreshTrigger = 0 }: WinnerListProps) => {
  const { winners, loading, error, refetch } = useWinners(refreshTrigger);

  if (loading) return <LoadingSpinner size="sm" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

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