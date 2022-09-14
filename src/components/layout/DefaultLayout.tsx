import { Box } from "@chakra-ui/react";
import { Sidebar } from "components/Sidebar";
import { Header } from "components/Header";
import { FC, ReactNode } from "react";
import { theme } from "theme/theme";

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Sidebar />
      <Box float="right" w="80%" bg={theme.subColor}>
        <Header />
        <Box marginTop="70px" paddingX="10px" marginBottom="10px">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
