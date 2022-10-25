import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { words } from "utils/words";
import { Statistics } from "../Statistics";
import { MonthlyBookBarChartComponent } from "./MonthlyBookBarChartComponent";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const MonthlyBookBarChart = ({ data, isLoading }: Props) => {
  return (
    <Statistics
      title={words.dashboard.books.chartTitle.monthly}
      icon={MdBarChart}
      isLoading={isLoading}
    >
      <MonthlyBookBarChartComponent data={data} />
    </Statistics>
  );
};
