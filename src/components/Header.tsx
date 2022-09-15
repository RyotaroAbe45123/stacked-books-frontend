// import { Box, Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@chakra-ui/react";
import { LogoutButton } from "auth/LogoutButton";
import { theme } from "theme/theme";

export const Header = () => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  // const routes = [
  //   {
  //     name: "About",
  //   },
  //   {
  //     name: "Feature",
  //   },
  //   {
  //     name: "Contact",
  //   },
  // ];
  return (
    <Box
      position="fixed"
      w="80%"
      h="50px"
      bg={theme.mainColor}
      borderRadius="10px"
      marginTop="10px"
    >
      <Box float="right" display="flex" paddingRight="10px" alignItems="center">
        {/* {routes.map((route) => (
          <Box key={route.name} mx="5px">
            <Button
              bg={theme.mainColor}
              onClick={() => console.log(route.name)}
            >
              {route.name}
            </Button>
          </Box>
        ))} */}
        <Box mx="5px">
          <LogoutButton />
        </Box>
      </Box>
    </Box>
  );
};
