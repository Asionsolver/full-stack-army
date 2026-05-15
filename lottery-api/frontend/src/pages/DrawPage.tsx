import { DrawWinners } from '../components';

interface DrawPageProps {
  onSuccess: () => void;
}

export const DrawPage = ({ onSuccess }: DrawPageProps) => {
  return <DrawWinners onSuccess={onSuccess} />;
};