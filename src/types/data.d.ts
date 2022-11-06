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
  authors: string;
  price: number | null;
  pages: number | null;
};

export type StatsType = {
  count: number;
  price: number;
  pages: number;
}