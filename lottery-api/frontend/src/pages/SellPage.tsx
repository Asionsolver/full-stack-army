import { SellForm } from '../components';

interface SellPageProps {
  onSuccess: () => void;
}

export const SellPage = ({ onSuccess }: SellPageProps) => {
  return <SellForm onSuccess={onSuccess} />;
};