import { Stack } from "types/api";
import { FaBookOpen } from "react-icons/fa";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";
import { words } from "utils/words";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const TotalPagesOfBooks = ({ data, isLoading }: Props) => {
  const [pagesOfBooks, setPagesOfBooks] = useState<number>(0);
  // dataから本の冊数を計算する
  useEffect(() => {
    if (data !== undefined) {
      // 本の金額を計算する
      let totalPages = 0;
      data.forEach((i) => {
        totalPages += i.pages;
      });
      setPagesOfBooks(totalPages);
    }
  }, [data]);
  return (
    <SmallStatistics
      icon={FaBookOpen}
      title={words.dashboard.pages.statTitle.total}
      tag={words.dashboard.pages.statTag.total}
      value={String(pagesOfBooks.toLocaleString())}
      unit={words.dashboard.pages.statUnit}
      isLoading={isLoading}
    />
  );
};
