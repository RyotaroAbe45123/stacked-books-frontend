import { Box, Flex, Icon } from "@chakra-ui/react";
import { Card } from "components/Card";
import { SpinnerComponent } from "components/SpinnerComponent";
import { useMobileContext } from "contexts/MobileContext";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { theme } from "theme/theme";

type StatisticsProps = {
  title: string;
  icon: IconType;
  isLoading?: boolean;
  children: ReactNode;
};

export const Statistics = ({
  title,
  icon,
  isLoading = false,
  children,
}: StatisticsProps) => {
  const { isMobile } = useMobileContext();

  return (
    <Card heightPixel={400}>
      <Box w="100%" h="100%" padding={isMobile ? "10px" : "20px"}>
        <Flex
          w="100%"
          h="36px"
          justify="space-between"
          alignItems="center"
          paddingX={isMobile ? "10px" : "0px"}
        >
          <Box
            color={theme.mainText}
            fontSize={isMobile ? "1.25rem" : "1.5rem"}
            fontWeight="bold"
          >
            {title}
          </Box>
          <Flex
            ms="auto"
            alignItems="center"
            justifyContent="center"
            bg={theme.subColor}
            w="36px"
            h="36px"
            lineHeight="100%"
            borderRadius="10px"
          >
            <Icon as={icon} color={theme.activeColor} w="24px" h="24px" />
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="calc(100% - 36px)"
          justify="center"
          align="center"
          marginTop="10px"
        >
          {isLoading ? <SpinnerComponent /> : <>{children}</>}
        </Flex>
      </Box>
    </Card>
  );
};
