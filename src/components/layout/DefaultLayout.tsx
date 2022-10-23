import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "components/layout/Sidebar";
import { Header } from "components/layout/Header";
import { FC, ReactNode } from "react";
import { theme } from "theme/theme";
import { MobileHeader } from "./MobileHeader";
import { useMobileContext } from "contexts/MobileContext";

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  const { isMobile } = useMobileContext();
  if (isMobile) {
    return (
      <Box bg={theme.subColor}>
        <MobileHeader />
        <Box
          paddingTop="70px"
          paddingX="20px"
          //  marginBottom="75px"
          paddingBottom="20px"
        >
          {children}
        </Box>
      </Box>
    );
  } else {
    return (
      <Flex>
        <Sidebar />
        <Box bg={theme.subColor} w="80%" marginLeft="20%">
          <Header />
          <Box
            paddingTop="70px"
            paddingX="20px"
            // marginBottom="75px"
            paddingBottom="20px"
          >
            {children}
          </Box>
        </Box>
      </Flex>
    );
  }
};
