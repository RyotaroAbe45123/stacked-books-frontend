import { Stack } from "types/api";
import { MdLibraryBooks } from "react-icons/md";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";
import { words } from "utils/words";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const TotalNumberOfBooks = ({ data, isLoading }: Props) => {
  const [numberOfBooks, setNumberOfBooks] = useState<number>(0);
  // dataから本の冊数を計算する
  useEffect(() => {
    if (data !== undefined) {
      setNumberOfBooks(data.length);
    }
  }, [data]);
  return (
    <SmallStatistics
      icon={MdLibraryBooks}
      title={words.dashboard.books.statTitle.total}
      tag={words.dashboard.books.statTag.total}
      value={String(numberOfBooks)}
      unit={words.dashboard.books.statUnit}
      isLoading={isLoading}
    />
  );
};
