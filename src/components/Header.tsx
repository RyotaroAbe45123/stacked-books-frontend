import { Box, Text } from "@chakra-ui/react";
import { LogoutButton } from "auth/LogoutButton";
import { useLocation } from "react-router-dom";
import { routes } from "Routes";
import { theme } from "theme/theme";

export const Header = () => {
  const location = useLocation();

  const getActivePageName = (pathName: string) => {
    const pageName = routes.find((route) => route.path === pathName);
    return pageName?.name ? pageName?.name : "Not Found";
  };

  return (
    <Box
      position="fixed"
      w="80%"
      h="50px"
      bg={theme.subColor}
      borderRadius="10px"
      marginTop="10px"
      paddingX="20px"
    >
      <Box
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX="15px"
      >
        <Box>
          <Text fontSize="1.5rem" fontWeight="bold">
            {getActivePageName(location.pathname)}
          </Text>
        </Box>
        <Box>
          <LogoutButton />
        </Box>
      </Box>
    </Box>
  );
};
