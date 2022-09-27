import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "components/Sidebar";
import { Header } from "components/Header";
import { FC, ReactNode } from "react";
import { theme } from "theme/theme";

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box bg={theme.subColor} w="80%" marginLeft="20%">
        <Header />
        <Box paddingTop="70px" paddingX="20px" marginBottom="20px">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
