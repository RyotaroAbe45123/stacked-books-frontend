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
