import { Statistics } from "../Statistics";
import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { DailyBarChartDataType } from "types/data";
import { theme } from "theme/theme";
import { words } from "utils/words";
import { useMobileContext } from "contexts/MobileContext";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const DailyBookBarChart = ({ data, isLoading }: Props) => {
  const { isMobile } = useMobileContext();

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
      title={words.dashboard.books.chartTitle.daily}
      icon={MdBarChart}
      isLoading={isLoading}
    >
      <BarChart
        width={isMobile ? 300 : 400}
        height={isMobile ? 250 : 300}
        data={barChartData}
        barSize={isMobile ? 15 : 20}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Bar dataKey="num" fill={theme.activeColor} />
      </BarChart>
    </Statistics>
  );
};
