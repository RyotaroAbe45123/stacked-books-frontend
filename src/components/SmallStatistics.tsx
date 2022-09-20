import { Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Card } from "./Card";

type SmallStatisticsProps = {
  title: string;
  value: string;
};

export const SmallStatistics = ({ title, value }: SmallStatisticsProps) => {
  return (
    <Card>
      <Flex my="auto" h="100%" align="center" justify="center">
        <Stat my="auto" ms="0%">
          <StatLabel lineHeight="100%" fontSize="sm">
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl">{value}</StatNumber>
        </Stat>
      </Flex>
    </Card>
  );
};
