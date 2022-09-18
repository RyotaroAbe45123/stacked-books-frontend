import { Box } from "@chakra-ui/react";
import { Dashboard } from "components/Dashboard";
import { useAuthGuard } from "utils/Auth";

export const Home = () => {
  useAuthGuard();

  return (
    <Box>
      <Dashboard />
    </Box>
  );
};
