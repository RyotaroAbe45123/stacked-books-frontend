export interface DailyBarChartDataType {
  date: number;
  num: number;
};

export interface MonthlyLineChartDataType {
  month: string;
  num: number;
};
type PieDataType = {
  name: string;
  num: number;
};


export type TableListDataType = {
  date: string;
  title: string;
  price: number | null;
  pages: number | null;
};
