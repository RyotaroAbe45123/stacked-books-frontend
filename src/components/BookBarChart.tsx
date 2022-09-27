import { Statistics } from "./Statistics";
import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { BarChartDataType } from "types/data";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const BookBarChart = ({ data, isLoading }: Props) => {
  const [barChartData, setBarChartData] = useState<BarChartDataType[]>();

  const initData = (): BarChartDataType[] => {
    const initDataList: BarChartDataType[] = [];
    const today = new Date();
    for (let i = 5; i > -1; i--) {
      const thisMonth = today.getMonth() + 1;
      const targetDateTS = new Date().setMonth(thisMonth - 1 - i);
      const targetMonth = new Date(targetDateTS).getMonth() + 1;
      initDataList.push({
        month: targetMonth,
        num: 0,
      });
    }
    return initDataList;
  };

  const countBooks = (stacks: Stack[], initData: BarChartDataType[]) => {
    for (const stack of stacks) {
      initData.forEach((data) => {
        if (data.month === new Date(stack.timestamp).getMonth() + 1) {
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
    <Statistics title="book" icon={MdBarChart} isLoading={isLoading}>
      <BarChart width={500} height={250} data={barChartData} barSize={20}>
        <XAxis dataKey="month" />
        <YAxis />
        <Bar dataKey="num" fill="blue" />
      </BarChart>
    </Statistics>
  );
};
