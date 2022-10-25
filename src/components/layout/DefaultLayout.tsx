import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "components/layout/Sidebar";
import { Header } from "components/layout/Header";
import { FC, ReactNode } from "react";
import { theme } from "theme/theme";
import { MobileHeader } from "./MobileHeader";
import { useMobileContext } from "contexts/MobileContext";
import { ScrollToTop } from "./ScrollToTop";

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  const { isMobile } = useMobileContext();
  if (isMobile) {
    return (
      <Box bg={theme.subColor}>
        <MobileHeader />
        <ScrollToTop>
          <Box paddingTop="70px" paddingX="20px" paddingBottom="20px">
            {children}
          </Box>
        </ScrollToTop>
      </Box>
    );
  } else {
    return (
      <Flex>
        <Sidebar />
        <Box bg={theme.subColor} w="80%" marginLeft="20%">
          <Header />
          <ScrollToTop>
            <Box paddingTop="70px" paddingX="20px" paddingBottom="20px">
              {children}
            </Box>
          </ScrollToTop>
        </Box>
      </Flex>
    );
  }
};
