import { Stack } from "types/api";
import { DailyBarChartDataType, MonthlyBarChartDataType } from "types/data";

export const filterThisMonth = (timestamp: string) => {
  const timestampMonth = new Date(timestamp).getMonth() + 1;
  const thisMonth = new Date().getMonth() + 1;
  return timestampMonth === thisMonth ? true : false;
};

export const filterThisWeek = (timestamp: string) => {
  const today = new Date();
  const dateBefore7Days = today.setDate(today.getDate() - 7);
  const dateBefore7DaysTS = new Date(dateBefore7Days);
  return new Date(timestamp) > dateBefore7DaysTS;
};

export const filterLatest6Month = (timestamp: string) => {
  const today = new Date();
  const dateBefore6Month = today.setMonth(today.getMonth() + 1 - 6);
  const dateBefore6MonthTS = new Date(dateBefore6Month);
  return new Date(timestamp) > dateBefore6MonthTS;
};

export const countBooks = (stacks: Stack[], initData:  DailyBarChartDataType[]| MonthlyBarChartDataType[]) => {
  if (initData.length > 0 && "date" in initData[0]) {
    for (const stack of stacks) {
      initData.forEach((data) => {
        if ((data as DailyBarChartDataType).date === new Date(stack.timestamp).getDate()) {
          data.num++;
        }
      });
    }
    return initData;
  }
  else if (initData.length > 0 && "month" in initData[0]) {
    for (const stack of stacks) {
      initData.forEach((data) => {
        const d = new Date(stack.timestamp);
        const y = `${d.getFullYear()}/${d.getMonth() + 1}`;
        if ((data as MonthlyBarChartDataType).month === y) {
          data.num++;
        }
      });
    }
    return initData;
  }
  else {
    return initData;
    }
};

export const calcMaxYTick = (data: DailyBarChartDataType[]| MonthlyBarChartDataType[]) => {
  const maxValue = Math.max(...data.map((item) => item.num));
  const digit = maxValue.toString().length;
  const half = Math.pow(10, digit) / 2;
  const yTick = maxValue < half ? half : digit;
  return yTick;
}