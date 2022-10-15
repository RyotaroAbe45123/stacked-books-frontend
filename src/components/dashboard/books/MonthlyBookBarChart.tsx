import { useMobileContext } from "contexts/MobileContext";
import { calcMaxYTick, countBooks } from "functions/utils";
import { useCallback, useEffect, useState } from "react";
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

  const [maxYTick, setMaxYTick] = useState<number>(10);

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

  const countBooksCallback = useCallback(countBooks, []);

  const calcMaxYTickCallback = useCallback(calcMaxYTick, []);

  useEffect(() => {
    const initializedData = initData();

    if (data !== undefined) {
      const monthlyData = countBooksCallback(data, initializedData);
      setBarChartData(monthlyData as MonthlyBarChartDataType[]);
      setMaxYTick(
        calcMaxYTickCallback(monthlyData as MonthlyBarChartDataType[]),
      );
    } else {
      setBarChartData(initializedData);
    }
  }, [data, countBooksCallback, calcMaxYTickCallback]);

  return (
    <Statistics
      title={words.dashboard.books.chartTitle.monthly}
      icon={MdBarChart}
      isLoading={isLoading}
    >
      <BarChart
        width={isMobile ? 300 : 375}
        height={isMobile ? 300 : 300}
        data={barChartData}
        barSize={isMobile ? 15 : 20}
        margin={{
          top: 10,
          bottom: 0,
          right: 5,
          left: -20,
        }}
      >
        <XAxis
          dataKey="month"
          angle={-10}
          tickMargin={3}
          tickLine={false}
          interval={isMobile ? "preserveEnd" : 0}
        />
        <YAxis
          domain={[0, maxYTick]}
          tickCount={6}
          interval={0}
          minTickGap={1}
        />
        <Bar dataKey="num" fill={theme.activeColor} />
      </BarChart>
    </Statistics>
  );
};
