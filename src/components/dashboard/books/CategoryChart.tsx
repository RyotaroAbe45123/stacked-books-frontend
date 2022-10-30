import { useCallback, useEffect, useState } from "react";
import { BsFillPieChartFill } from "react-icons/bs";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { theme } from "theme/theme";
import { Stack } from "types/api";
import { PieDataType } from "types/data";
import { words } from "utils/words";
import { Statistics } from "../Statistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const CategoryChart = ({ data, isLoading }: Props) => {
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
    mapList.filter(
      (m) => (m.name = (words.dashboard.books.categoryName as any)[m.name]),
    );
    setPieData(mapList.filter((m) => m.num !== 0));
  }, [data]);

  useEffect(() => {
    if (data !== undefined) {
      createPieData();
    }
  }, [data, createPieData]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    num,
  }: any) => {
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const lx = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const ly = cy + labelRadius * Math.sin(-midAngle * RADIAN);
    const textRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const tx = cx + textRadius * Math.cos(-midAngle * RADIAN);
    const ty = cy + textRadius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={lx}
          y={ly}
          fill={theme.mainText}
          textAnchor={lx > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {name}
        </text>
        <text
          x={lx}
          y={ly}
          dy="1rem"
          fill={theme.mainText}
          textAnchor={lx > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
        <text
          fontWeight="bold"
          x={tx}
          y={ty}
          fill={theme.mainColor}
          textAnchor={tx > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {num}
        </text>
      </>
    );
  };

  return (
    <Statistics
      title={words.dashboard.books.categoryTitle}
      icon={BsFillPieChartFill}
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            nameKey="name"
            dataKey="num"
            label={renderCustomizedLabel}
            data={pieData}
            fill={theme.activeColor}
            startAngle={90}
            endAngle={450}
          />
        </PieChart>
      </ResponsiveContainer>
    </Statistics>
  );
};
