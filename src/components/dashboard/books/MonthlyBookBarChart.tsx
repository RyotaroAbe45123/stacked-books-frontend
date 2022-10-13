import { useMobileContext } from "contexts/MobileContext";
import { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { theme } from "theme/theme";
import { Stack } from "types/api";
import { MonthlyBarChartDataType } from "types/data";
import { words } from "utils/words";
import { Statistics } from "../Statistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const MonthlyBookBarChart = ({ data, isLoading }: Props) => {
  const { isMobile } = useMobileContext();

  const [barChartData, setBarChartData] = useState<MonthlyBarChartDataType[]>();

  const initData = (): MonthlyBarChartDataType[] => {
    const initDataList: MonthlyBarChartDataType[] = [];
    const today = new Date();
    for (let i = 5; i > -1; i--) {
      const thisMonth = today.getMonth() + 1;
      const targetDateTS = new Date().setMonth(thisMonth - 1 - i);
      const targetMonth = new Date(targetDateTS).getMonth() + 1;
      const targetYear = new Date(targetDateTS).getFullYear();
      initDataList.push({
        month: `${targetYear}/${targetMonth}`,
        num: 0,
      });
    }
    return initDataList;
  };

  const countBooks = (stacks: Stack[], initData: MonthlyBarChartDataType[]) => {
    for (const stack of stacks) {
      initData.forEach((data) => {
        const d = new Date(stack.timestamp);
        const y = `${d.getFullYear()}/${d.getMonth() + 1}`;
        if (data.month === y) {
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
      title={words.dashboard.books.chartTitle.monthly}
      icon={MdBarChart}
      isLoading={isLoading}
    >
      <BarChart
        width={isMobile ? 300 : 400}
        height={isMobile ? 250 : 300}
        data={barChartData}
        barSize={isMobile ? 15 : 20}
      >
        <XAxis dataKey="week" />
        <YAxis />
        <Bar dataKey="num" fill={theme.activeColor} />
      </BarChart>
    </Statistics>
  );
};
