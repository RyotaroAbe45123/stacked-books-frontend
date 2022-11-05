import { Stack } from "types/api";
import { DailyBarChartDataType, MonthlyLineChartDataType, StatsType } from "types/data";


export const createTweetComponent = ({ count, price, pages }: StatsType): string => {
  return `${count}冊の本を積み上げました！%0D%0A${price.toLocaleString()}円を本に使いました！%0D%0A${pages.toLocaleString()}ページ分の本を積み上げました！`
}

export const createTweet = (text: string) => {
  return `${text}%0D%0A`
}

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

export const countBooks = (stacks: Stack[], initData:  DailyBarChartDataType[]| MonthlyLineChartDataType[]) => {
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
        if ((data as MonthlyLineChartDataType).month === y) {
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

export const calcMaxYTick = (data: DailyBarChartDataType[]| MonthlyLineChartDataType[]) => {
  const maxValue = Math.max(...data.map((item) => item.num));
  const digit = maxValue.toString().length;
  const half = Math.pow(10, digit) / 2;
  const yTick = maxValue < half ? half : Math.pow(10, digit);
  return yTick;
}

export const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export const calcStats = (stacks: Stack[]): StatsType => {
  const numOfBooks = stacks.length;
  let totalPrice = 0;
  let totalPages = 0;
  stacks.forEach((i) => {
    totalPrice += i.price ?? 0;
    totalPages += i.pages ?? 0;
  });
  return {
    count: numOfBooks,
    price: totalPrice,
    pages: totalPages,
  }
}

