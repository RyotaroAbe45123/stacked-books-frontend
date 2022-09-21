import { Flex, Skeleton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Card } from "./Card";

type SmallStatisticsProps = {
  title: string;
  value: string;
  isLoading: boolean;
};

export const SmallStatistics = ({
  title,
  value,
  isLoading,
}: SmallStatisticsProps) => {
  return (
    <Card>
      <Flex my="auto" h="100%" align="center" justify="center">
        {isLoading ? (
          <Skeleton />
        ) : (
          <Stat my="auto" ms="0%">
            <StatLabel lineHeight="100%" fontSize="sm">
              {title}
            </StatLabel>
            <StatNumber fontSize="2xl">{value}</StatNumber>
          </Stat>
        )}
      </Flex>
    </Card>
  );
};
