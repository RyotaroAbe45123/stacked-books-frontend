import { Stack } from "types/api";
import { SmallStatistics } from "./SmallStatistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const TotalPagesOfBooks = ({ data, isLoading }: Props) => {
  // 本の金額を計算する
  let totalPages = 0;
  data?.forEach((i) => {
    totalPages += i.pages;
  });
  return (
    <SmallStatistics
      title="積んだ厚さ"
      value={String(totalPages)}
      isLoading={isLoading}
    />
  );
};
