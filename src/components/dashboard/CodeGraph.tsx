import { useCallback, useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import { theme } from "theme/theme";
import { Stack } from "types/api";
import { Statistics } from "./Statistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

type PieDataType = {
  name: string;
  num: number;
};

export const CodeGraph = ({ data, isLoading }: Props) => {
  const [pieData, setPieData] = useState<PieDataType[]>([]);

  const createPieData = useCallback(() => {
    const mapList: PieDataType[] = [];
    [...Array(10)].map((_, i) => mapList.push({ name: String(i), num: 0 }));
    if (data) {
      data.forEach((d) => {
        mapList.forEach((m) => {
          if (d.c_code.slice(2, 3) === m.name) {
            m.num++;
          }
        });
      });
    }
    setPieData(mapList.filter((m) => m.num !== 0));
  }, [data]);

  useEffect(() => {
    if (data !== undefined) {
      createPieData();
    }
  }, [data, createPieData]);

  return (
    <Statistics title="hoge" icon={MdBarChart} isLoading={isLoading}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="num" label data={pieData} fill={theme.activeColor} />
        </PieChart>
      </ResponsiveContainer>
    </Statistics>
  );
};
