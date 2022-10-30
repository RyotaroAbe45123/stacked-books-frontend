import { Stack } from "types/api";
import { FaBookOpen } from "react-icons/fa";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";
import { filterThisMonth } from "functions/utils";
import { words } from "utils/words";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const MonthlyPagesOfBooks = ({ data, isLoading }: Props) => {
  const [pagesOfBooks, setPagesOfBooks] = useState<number>(0);
  // dataから本の冊数を計算する
  useEffect(() => {
    if (data !== undefined) {
      const filteredData = data.filter((d) => filterThisMonth(d.timestamp));
      // 本の金額を計算する
      let totalPages = 0;
      filteredData.forEach((i) => {
        totalPages += i.pages ?? 0;
      });
      setPagesOfBooks(totalPages);
    }
  }, [data]);
  return (
    <SmallStatistics
      icon={FaBookOpen}
      title={words.dashboard.pages.statTitle.monthly}
      value={String(pagesOfBooks.toLocaleString())}
      unit={words.dashboard.pages.statUnit}
      isLoading={isLoading}
    />
  );
};
