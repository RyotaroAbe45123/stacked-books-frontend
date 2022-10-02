import { Statistics } from "../Statistics";
import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { DailyBarChartDataType } from "types/data";
import { theme } from "theme/theme";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const DailyBookBarChart = ({ data, isLoading }: Props) => {
  const [barChartData, setBarChartData] = useState<DailyBarChartDataType[]>();

  const initData = (): DailyBarChartDataType[] => {
    const initDataList: DailyBarChartDataType[] = [];
    const today = new Date();
    for (let i = 6; i > -1; i--) {
      const targetDateTS = new Date().setDate(today.getDate() - i);
      const targetDate = new Date(targetDateTS).getDate();
      initDataList.push({
        date: targetDate,
        num: 0,
      });
    }
    return initDataList;
  };

  const countBooks = (stacks: Stack[], initData: DailyBarChartDataType[]) => {
    for (const stack of stacks) {
      initData.forEach((data) => {
        if (data.date === new Date(stack.timestamp).getDate()) {
          data.num++;
        }
      });
    }
    return initData;
  };

  useEffect(() => {
    const initializedData = initData();

    if (data !== undefined) {
      setBarChartData(countBooks(data, initializedData));
    } else {
      setBarChartData(initializedData);
    }
  }, [data]);

  return (
    <Statistics
      title="Daily Books Chart"
      icon={MdBarChart}
      isLoading={isLoading}
    >
      <BarChart width={400} height={300} data={barChartData} barSize={20}>
        <XAxis dataKey="date" />
        <YAxis />
        <Bar dataKey="num" fill={theme.activeColor} />
      </BarChart>
    </Statistics>
  );
};