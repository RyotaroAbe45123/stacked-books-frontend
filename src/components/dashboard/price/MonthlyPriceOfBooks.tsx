import { Stack } from "types/api";
import { FaYenSign } from "react-icons/fa";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";
import { filterThisMonth } from "functions/utils";
import { words } from "utils/words";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const MonthlyPriceOfBooks = ({ data, isLoading }: Props) => {
  const [priceOfBooks, setPriceOfBooks] = useState<number>(0);
  // dataから本の金額を計算する
  useEffect(() => {
    if (data !== undefined) {
      const filteredData = data.filter((d) => filterThisMonth(d.timestamp));
      // 本の金額を計算する
      let totalPrice = 0;
      filteredData.forEach((i) => {
        totalPrice += i.price ?? 0;
      });
      setPriceOfBooks(totalPrice);
    }
  }, [data]);
  return (
    <SmallStatistics
      icon={FaYenSign}
      title={words.dashboard.price.statTitle.monthly}
      value={String(priceOfBooks.toLocaleString())}
      unit={words.dashboard.price.statUnit}
      isLoading={isLoading}
    />
  );
};
