import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LogoutButton } from "auth/LogoutButton";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "Routes";
import { theme } from "theme/theme";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActivePageName = (pathName: string) => {
    const pageName = routes.find((route) => route.path === pathName);
    return pageName?.name ? pageName?.name : "Not Found";
  };

  return (
    <Box
      position="fixed"
      w="80%"
      h="70px"
      bg={theme.subColor}
      borderRadius="10px"
      paddingX="20px"
    >
      <Flex h="100%" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="1.5rem" fontWeight="bold">
            {getActivePageName(location.pathname)}
          </Text>
        </Box>
        <Flex>
          <Button
            onClick={() => navigate("/register")}
            bg={theme.mainColor}
            marginRight="10px"
          >
            本を積む
          </Button>
          <LogoutButton />
        </Flex>
      </Flex>
    </Box>
  );
};
