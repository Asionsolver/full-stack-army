import { LotteryTable } from "../components";

interface LotteriesPageProps {
  refreshTrigger?: number;
}

export const LotteriesPage = ({ refreshTrigger = 0 }: LotteriesPageProps) => {
  return <LotteryTable refreshTrigger={refreshTrigger} />;
};