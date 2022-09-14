import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { theme } from "theme/theme";

type Props = {
  children: ReactNode;
};

export const Card: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // alignContent="center"
      // flexDirection="column"
      w="100%"
      borderRadius="30px"
      bg={theme.mainColor}
      textColor={theme.mainText}
    >
      {children}
    </Box>
  );
};
