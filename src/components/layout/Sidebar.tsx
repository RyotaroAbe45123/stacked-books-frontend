import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { theme } from "theme/theme";
import { routes } from "Routes";
import Logo from "../../assets/stacked-books-logo.png";

export const Sidebar = () => {
  const location = useLocation();

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  return (
    <Box position="fixed" height="100vh" width="20%">
      <Box display="flex" justifyContent="center" alignItems="center" h="100px">
        <NavLink to="/home">
          <Flex justifyContent="center" alignItems="center">
            <Image src={Logo} w="80%" />
          </Flex>
        </NavLink>
      </Box>
      <Divider />
      <Box ps="20px" pe="1px">
        {routes.map((route, index) => (
          <NavLink key={index} to={route.path}>
            <Box>
              <HStack py="10px" ps="10px">
                <Flex w="100%" alignItems="start" justifyContent="center">
                  <Box
                    me="18px"
                    mt="2px"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? theme.activeColor
                        : theme.inactiveColor
                    }
                  >
                    <Icon
                      as={route.icon}
                      width="20px"
                      height="20px"
                      color="inherit"
                    />
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? theme.mainText
                        : theme.inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h="36px"
                  w="4px"
                  borderRadius="5px"
                  bg={
                    activeRoute(route.path.toLowerCase())
                      ? theme.activeColor
                      : "transparent"
                  }
                />
              </HStack>
            </Box>
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};
