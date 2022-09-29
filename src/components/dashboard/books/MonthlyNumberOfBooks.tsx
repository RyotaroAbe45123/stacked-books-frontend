import { Stack } from "types/api";
import { MdLibraryBooks } from "react-icons/md";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";
import { filterThisMonth } from "functions/utils";

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
      title="積んだ冊数"
      value={String(numberOfBooks)}
      isLoading={isLoading}
    />
  );
};
