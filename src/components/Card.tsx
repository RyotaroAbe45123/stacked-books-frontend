import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { theme } from "theme/theme";

type Props = {
  heightPixel?: number;
  children: ReactNode;
};

export const Card: FC<Props> = ({ heightPixel = 100, children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h={`${heightPixel}px`}
      borderRadius="30px"
      bg={theme.mainColor}
      textColor={theme.mainText}
    >
      {children}
    </Box>
  );
};
