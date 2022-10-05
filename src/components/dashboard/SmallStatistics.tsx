import {
  Box,
  Flex,
  Icon,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
} from "@chakra-ui/react";
import { theme } from "theme/theme";
import { Card } from "../Card";
import { IconType } from "react-icons";
import { words } from "utils/words";

type SmallStatisticsProps = {
  icon: IconType;
  title: string;
  tag: string;
  value: string;
  unit: string;
  isLoading: boolean;
};

export const SmallStatistics = ({
  icon,
  title,
  tag,
  value,
  unit,
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
        <Box marginLeft="20px" marginTop="5%">
          <Stat>
            <Flex alignItems="center" marginBottom="0px">
              <StatLabel lineHeight="100%" fontSize="sm">
                {title}
              </StatLabel>
              <Tag
                marginLeft="10px"
                size="sm"
                borderWidth="2px"
                borderColor={
                  tag === words.dashboard.books.statTag.total
                    ? theme.activeColor
                    : theme.inactiveColor
                }
              >
                {tag}
              </Tag>
            </Flex>
            {isLoading ? (
              <Skeleton color={theme.subColor} height={45} width={100} />
            ) : (
              <StatNumber fontSize="3xl">{value}</StatNumber>
            )}
            <StatHelpText>{unit}</StatHelpText>
          </Stat>
        </Box>
      </Flex>
    </Card>
  );
};
