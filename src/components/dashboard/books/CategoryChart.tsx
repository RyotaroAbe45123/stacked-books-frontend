import { useMobileContext } from "contexts/MobileContext";
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
  const { isMobile } = useMobileContext();

  const [pieData, setPieData] = useState<PieDataType[]>([]);

  const createPieData = useCallback(() => {
    const mapList: PieDataType[] = [];
    [...Array(10)].map((_, i) => mapList.push({ name: String(i), num: 0 }));
    if (data) {
      data.forEach((d) => {
        mapList.forEach((m) => {
          if (d.c_code?.slice(2, 3) === m.name) {
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
    outerRadius,
    percent,
    name,
    num,
  }: any) => {
    const labelRadius = outerRadius * 1.2;
    const lx = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const ly = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    const textRadius = outerRadius * 0.5;
    const tx = cx + textRadius * Math.cos(-midAngle * RADIAN);
    const ty = cy + textRadius * Math.sin(-midAngle * RADIAN);

    const shift = Math.abs(cx - tx) / 2;

    if (isMobile) {
      return (
        <g>
          <text
            fontWeight="bold"
            x={tx}
            y={ty}
            dx={tx > cx ? -1 * shift : shift}
            dy="-9"
            fill={theme.mainColor}
            textAnchor={tx > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {name}
          </text>
          <text
            fontWeight="bold"
            x={tx}
            y={ty}
            dx={tx > cx ? -1 * shift : shift}
            fill={theme.mainColor}
            dy="9"
            textAnchor={tx > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`(${(percent * 100).toFixed(0)}%)`}
          </text>
        </g>
      );
    } else {
      return (
        <g>
          <text
            x={lx}
            y={ly}
            dy="-9"
            fill={theme.mainText}
            textAnchor={lx > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {name}
          </text>
          <text
            x={lx}
            y={ly}
            dy="9"
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
        </g>
      );
    }
  };

  return (
    <Statistics
      title={words.dashboard.books.categoryTitle}
      icon={BsFillPieChartFill}
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
        // margin={{
        //   right: 30,
        //   left: 30,
        // }}
        >
          <Pie
            nameKey="name"
            dataKey="num"
            labelLine={isMobile ? false : true}
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
