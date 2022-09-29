import {
  Box,
  Flex,
  Icon,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { theme } from "theme/theme";
import { Card } from "../Card";
import { IconType } from "react-icons";

type SmallStatisticsProps = {
  icon: IconType;
  title: string;
  value: string;
  isLoading: boolean;
};

export const SmallStatistics = ({
  icon,
  title,
  value,
  isLoading,
}: SmallStatisticsProps) => {
  return (
    <Card heightPixel={100}>
      <Flex w="100%" h="100%" alignItems="center" paddingX="10%">
        <Flex
          alignItems="center"
          justifyContent="center"
          bg={theme.subColor}
          w="48px"
          h="48px"
          borderRadius="50%"
        >
          <Icon as={icon} color={theme.activeColor} w="24px" h="24px" />
        </Flex>
        <Box marginLeft="20px">
          <Stat>
            <StatLabel lineHeight="100%" fontSize="sm">
              {title}
            </StatLabel>
            {isLoading ? (
              <Skeleton color={theme.subColor} height={45} width={100} />
            ) : (
              <StatNumber fontSize="3xl">{value}</StatNumber>
            )}
          </Stat>
        </Box>
      </Flex>
    </Card>
  );
};
