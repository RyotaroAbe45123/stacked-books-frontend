import { Statistics } from "../Statistics";
import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useCallback, useEffect, useState } from "react";
import { DailyBarChartDataType } from "types/data";
import { theme } from "theme/theme";
import { words } from "utils/words";
import { useMobileContext } from "contexts/MobileContext";
import { calcMaxYTick, countBooks } from "functions/utils";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const DailyBookBarChart = ({ data, isLoading }: Props) => {
  const { isMobile } = useMobileContext();

  const [maxYTick, setMaxYTick] = useState<number>(50);

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

  const countBooksCallback = useCallback(countBooks, []);

  const calcMaxYTickCallback = useCallback(calcMaxYTick, []);

  useEffect(() => {
    const initializedData = initData();

    if (data !== undefined) {
      const dailyData = countBooksCallback(data, initializedData);
      setBarChartData(dailyData as DailyBarChartDataType[]);
      setMaxYTick(calcMaxYTickCallback(dailyData as DailyBarChartDataType[]));
    } else {
      setBarChartData(initializedData);
    }
  }, [data, countBooksCallback, calcMaxYTickCallback]);

  return (
    <Statistics
      title={words.dashboard.books.chartTitle.daily}
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
          right: 0,
          left: -20,
        }}
      >
        <XAxis
          dataKey="date"
          tickFormatter={(value) => `${value}日`}
          angle={-10}
          tickMargin={3}
          tickLine={false}
          interval={0}
        />
        <YAxis
          domain={[0, maxYTick]}
          tickCount={6}
          interval={isMobile ? "preserveEnd" : 0}
          minTickGap={1}
        />
        <Bar dataKey="num" fill={theme.activeColor} />
      </BarChart>
    </Statistics>
  );
};
