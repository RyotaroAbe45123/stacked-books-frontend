import { Box, Spinner } from "@chakra-ui/react";

type SpinnerProps = {
  size?: string;
};

export const SpinnerComponent = ({ size }: SpinnerProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20%"
    >
      <Spinner size="lg" thickness="5px" />
    </Box>
  );
};
