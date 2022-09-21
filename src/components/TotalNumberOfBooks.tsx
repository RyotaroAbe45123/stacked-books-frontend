import { Stacks } from "types/api";
import { SmallStatistics } from "./SmallStatistics";

type Props = {
  data: Stacks[] | undefined;
};

export const TotalNumberOfBooks = ({ data }: Props) => {
  // dataから本の冊数を計算する
  const num = data?.length;
  return (
    <SmallStatistics
      title="積んだ冊数"
      value={String(num)}
      isLoading={data === undefined}
    />
  );
};
