import { Stack } from "types/api";
import { FaYenSign } from "react-icons/fa";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";
import { filterThisMonth } from "functions/utils";

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
        totalPrice += i.price;
      });
      setPriceOfBooks(totalPrice);
    }
  }, [data]);
  return (
    <SmallStatistics
      icon={FaYenSign}
      title="積んだ金額"
      value={String(priceOfBooks.toLocaleString())}
      isLoading={isLoading}
    />
  );
};