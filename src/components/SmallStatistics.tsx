import { Flex, Skeleton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { theme } from "theme/theme";
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
        <Stat my="auto" ms="0%">
          <StatLabel lineHeight="100%" fontSize="sm">
            {title}
          </StatLabel>
          {isLoading ? (
            <Skeleton color={theme.subColor} height={45} width={100} />
          ) : (
            <StatNumber fontSize="3xl">{value}</StatNumber>
          )}
        </Stat>
      </Flex>
    </Card>
  );
};
