import { Box, Button } from "@chakra-ui/react";
import { theme } from "theme/theme";

export const Header = () => {
  const routes = [
    {
      name: "About",
    },
    {
      name: "Feature",
    },
    {
      name: "Contact",
    },
  ];
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
        {routes.map((route) => (
          <Box key={route.name} mx="5px">
            <Button
              bg={theme.mainColor}
              onClick={() => console.log(route.name)}
            >
              {route.name}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
