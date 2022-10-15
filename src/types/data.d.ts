export interface DailyBarChartDataType {
  date: number;
  num: number;
};

export interface MonthlyBarChartDataType {
  month: string;
  num: number;
};

export type TableListDataType = {
  date: string;
  title: string;
  price: number;
  pages: number;
};
