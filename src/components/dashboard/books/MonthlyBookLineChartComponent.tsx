import { useMobileContext } from "contexts/MobileContext";
import { calcMaxYTick, countBooks } from "functions/utils";
import { useCallback, useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { theme } from "theme/theme";
import { Stack } from "types/api";
import { MonthlyLineChartDataType } from "types/data";

type Props = {
  data: Stack[] | undefined;
};

export const MonthlyBookLineChartComponent = ({ data }: Props) => {
  const { isMobile } = useMobileContext();

  const [maxYTick, setMaxYTick] = useState<number>(10);

  const [lineChartData, setLineChartData] =
    useState<MonthlyLineChartDataType[]>();

  const countBooksCallback = useCallback(countBooks, []);

  const calcMaxYTickCallback = useCallback(calcMaxYTick, []);

  const initData = (): MonthlyLineChartDataType[] => {
    const initDataList: MonthlyLineChartDataType[] = [];
    const today = new Date();
    for (let i = 5; i > -1; i--) {
      const thisMonth = today.getMonth() + 1;
      const targetDateTS = new Date().setMonth(thisMonth - 1 - i, 1);
      const targetMonth = new Date(targetDateTS).getMonth() + 1;
      const targetYear = new Date(targetDateTS).getFullYear();
      initDataList.push({
        month: `${targetYear}/${targetMonth}`,
        num: 0,
      });
    }
    return initDataList;
  };

  useEffect(() => {
    const initializedData = initData();

    if (data !== undefined) {
      const monthlyData = countBooksCallback(data, initializedData);
      setLineChartData(monthlyData as MonthlyLineChartDataType[]);
      setMaxYTick(
        calcMaxYTickCallback(monthlyData as MonthlyLineChartDataType[]),
      );
    } else {
      setLineChartData(initializedData);
    }
  }, [data, countBooksCallback, calcMaxYTickCallback]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={lineChartData}
        margin={{
          top: 10,
          bottom: 0,
          right: 30,
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
        <Tooltip />
        <Line
          dataKey="num"
          fill={theme.mainColor}
          type="linear"
          strokeWidth={3}
          dot={{ r: 5 }}
          stroke={theme.activeColor}
          activeDot={isMobile ? false : { r: 5, stroke: theme.activeColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
