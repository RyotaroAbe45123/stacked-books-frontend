import { Statistics } from "../Statistics";
import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { words } from "utils/words";
import { DailyBookBarChartComponent } from "./DailyBookBarChartComponent";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const DailyBookBarChart = ({ data, isLoading }: Props) => {
  return (
    <Statistics
      title={words.dashboard.books.chartTitle.daily}
      icon={MdBarChart}
      isLoading={isLoading}
    >
      <DailyBookBarChartComponent data={data} />
    </Statistics>
  );
};
