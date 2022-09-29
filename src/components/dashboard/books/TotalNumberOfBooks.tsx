import { Stack } from "types/api";
import { MdLibraryBooks } from "react-icons/md";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";

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
      title="積んだ冊数"
      value={String(numberOfBooks)}
      isLoading={isLoading}
    />
  );
};
