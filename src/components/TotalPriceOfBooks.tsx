import { Stack } from "types/api";
import { SmallStatistics } from "./SmallStatistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const TotalPriceOfBooks = ({ data, isLoading }: Props) => {
  // 本の金額を計算する
  let totalPrice = 0;
  data?.forEach((i) => {
    totalPrice += i.price;
  });
  return (
    <SmallStatistics
      title="積んだ金額"
      value={String(totalPrice.toLocaleString())}
      isLoading={isLoading}
    />
  );
};
