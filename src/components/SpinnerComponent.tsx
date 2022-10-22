import { Box, Spinner } from "@chakra-ui/react";

type SpinnerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const SpinnerComponent = ({ size = "md" }: SpinnerProps) => {
  return (
    <Box
      h="100%"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size={size} thickness="5px" />
    </Box>
  );
};
