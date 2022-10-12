import { Stack } from "types/api";
import { MdLibraryBooks } from "react-icons/md";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";
import { filterThisMonth } from "functions/utils";
import { words } from "utils/words";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const MonthlyNumberOfBooks = ({ data, isLoading }: Props) => {
  const [numberOfBooks, setNumberOfBooks] = useState<number>(0);
  // dataから本の冊数を計算する
  useEffect(() => {
    if (data !== undefined) {
      const filteredData = data.filter((d) => filterThisMonth(d.timestamp));
      setNumberOfBooks(filteredData.length);
    }
  }, [data]);
  return (
    <SmallStatistics
      icon={MdLibraryBooks}
      title={words.dashboard.books.statTitle.monthly}
      value={String(numberOfBooks)}
      unit={words.dashboard.books.statUnit}
      isLoading={isLoading}
    />
  );
};
