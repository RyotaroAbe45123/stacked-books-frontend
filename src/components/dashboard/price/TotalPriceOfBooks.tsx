import { Stack } from "types/api";
import { FaYenSign } from "react-icons/fa";
import { SmallStatistics } from "../SmallStatistics";
import { useEffect, useState } from "react";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const TotalPriceOfBooks = ({ data, isLoading }: Props) => {
  const [priceOfBooks, setPriceOfBooks] = useState<number>(0);
  // dataから本の金額を計算する
  useEffect(() => {
    if (data !== undefined) {
      // 本の金額を計算する
      let totalPrice = 0;
      data.forEach((i) => {
        totalPrice += i.price;
      });
      setPriceOfBooks(totalPrice);
    }
  }, [data]);
  return (
    <SmallStatistics
      icon={FaYenSign}
      title="全積金額"
      value={String(priceOfBooks.toLocaleString())}
      isLoading={isLoading}
    />
  );
};
