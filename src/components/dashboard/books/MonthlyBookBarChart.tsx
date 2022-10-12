import { useMobileContext } from "contexts/MobileContext";
import { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { theme } from "theme/theme";
import { Stack } from "types/api";
import { words } from "utils/words";
import { Statistics } from "../Statistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

type P = {
  week: string;
  num: number;
};

export const MonthlyBookBarChart = ({ data, isLoading }: Props) => {
  const { isMobile } = useMobileContext();

  const [barChartData, setBarChartData] = useState<P[]>();

  const initData = (): P[] => {
    const initDataList: P[] = [];
    const today = new Date();
    for (let i = 5; i > -1; i--) {
      const thisMonth = today.getMonth() + 1;
      const targetDateTS = new Date().setMonth(thisMonth - 1 - i);
      const targetMonth = new Date(targetDateTS).getMonth() + 1;
      const targetYear = new Date(targetDateTS).getFullYear();
      initDataList.push({
        week: `${targetYear}/${targetMonth}`,
        num: 0,
      });
    }
    return initDataList;
  };

  const countBooks = (stacks: Stack[], initData: P[]) => {
    for (const stack of stacks) {
      initData.forEach((data) => {
        const d = new Date(stack.timestamp);
        const y = `${d.getFullYear()}/${d.getMonth() + 1}`;
        if (data.week === y) {
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
        width={isMobile ? 300 : 200}
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
