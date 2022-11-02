import {
  Box,
  Flex,
  Icon,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { theme } from "theme/theme";
import { Card } from "../Card";
import { IconType } from "react-icons";
import { useMobileContext } from "contexts/MobileContext";
import { TweetButton } from "components/TweetButton";

type SmallStatisticsProps = {
  icon: IconType;
  title: string;
  value: string;
  unit: string;
  isLoading: boolean;
};

export const SmallStatistics = ({
  icon,
  title,
  value,
  unit,
  isLoading,
}: SmallStatisticsProps) => {
  const { isMobile } = useMobileContext();

  return (
    <Card heightPixel={isMobile ? 80 : 100}>
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
        <Box marginLeft="20px" marginTop={0}>
          <Stat>
            <Flex alignItems="center" marginBottom="0px">
              <StatLabel fontSize={isMobile ? "xs" : "sm"}>{title}</StatLabel>
            </Flex>
            {isLoading ? (
              <Skeleton
                color={theme.subColor}
                height={isMobile ? 30 : 45}
                width={100}
              />
            ) : (
              <StatNumber fontSize={isMobile ? "2xl" : "3xl"}>
                {value}
              </StatNumber>
            )}
            <StatHelpText fontSize={isMobile ? "xs" : "sm"} marginBottom={0}>
              {unit}
            </StatHelpText>
          </Stat>
        </Box>
        <TweetButton />
      </Flex>
    </Card>
  );
};
