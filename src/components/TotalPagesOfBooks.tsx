import { Stacks } from "types/api";
import { SmallStatistics } from "./SmallStatistics";

type Props = {
  data: Stacks[] | undefined;
};

export const TotalPagesOfBooks = ({ data }: Props) => {
  // 本の金額を計算する
  let p = 0;
  data?.forEach((d) => {
    p += d.pages;
  });
  return (
    <SmallStatistics
      title="積んだ厚さ"
      value={String(p)}
      isLoading={data === undefined}
    />
  );
};
