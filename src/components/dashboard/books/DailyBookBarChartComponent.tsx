import { useMobileContext } from "contexts/MobileContext";
import { calcMaxYTick, countBooks } from "functions/utils";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { theme } from "theme/theme";
import { Stack } from "types/api";
import { DailyBarChartDataType } from "types/data";

type Props = {
  data: Stack[] | undefined;
};

export const DailyBookBarChartComponent = ({ data }: Props) => {
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
  );
};
