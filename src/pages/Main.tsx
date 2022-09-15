import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@chakra-ui/react";
// import { Dashboard } from "components/Dashboard";

export const Main = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? <Box>{user?.name}</Box> : <div>di</div>;
  // <Box
  // //  marginLeft="300px"
  // >
  //   <Dashboard />
  // </Box>
};
