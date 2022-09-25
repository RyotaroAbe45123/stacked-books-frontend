import { Stack } from "types/api";
import { SmallStatistics } from "./SmallStatistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const TotalNumberOfBooks = ({ data, isLoading }: Props) => {
  // dataから本の冊数を計算する
  const num = data !== undefined ? data.length : 0;
  return (
    <SmallStatistics
      title="積んだ冊数"
      value={String(num)}
      isLoading={isLoading}
    />
  );
};
