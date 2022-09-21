import { Stacks } from "types/api";
import { SmallStatistics } from "./SmallStatistics";

type Props = {
  data: Stacks[] | undefined;
};

export const TotalPriceOfBooks = ({ data }: Props) => {
  // 本の金額を計算する
  let p = 0;
  data?.forEach((d) => {
    p += d.price;
  });
  return (
    <SmallStatistics
      title="積んだ金額"
      value={String(p)}
      isLoading={data === undefined}
    />
  );
};
