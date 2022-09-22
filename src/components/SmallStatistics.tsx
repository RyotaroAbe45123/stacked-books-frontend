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
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            height="20px"
            width={50}
          />
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
