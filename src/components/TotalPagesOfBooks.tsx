import { Stack } from "types/api";
import { FaBookOpen } from "react-icons/fa";
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
      icon={FaBookOpen}
      title="積んだページ数"
      value={String(totalPages.toLocaleString())}
      isLoading={isLoading}
    />
  );
};
