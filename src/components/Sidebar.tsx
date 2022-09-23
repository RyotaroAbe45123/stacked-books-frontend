import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const routes = [
    {
      name: "home",
      path: "/home",
      icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    },
    {
      name: "register",
      path: "/register",
      icon: (
        <Icon as={GiWhiteBook} width="20px" height="20px" color="inherit" />
      ),
    },
  ];

  const location = useLocation();

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  return (
    <Box position="fixed" height="100%" width="20%">
      <Box display="flex" justifyContent="center" alignItems="center" h="100px">
        <Heading>Stacked Books</Heading>
      </Box>
      <Divider />
      <Box ps="20px" pe="1px">
        {routes.map((route, index) => (
          <NavLink key={index} to={route.path}>
            <Box>
              <HStack
                py="5px"
                ps="10px"
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
              >
                <Flex w="100%" alignItems="start" justifyContent="center">
                  <Box
                    me="18px"
                    mt="2px"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? "brand.500"
                        : "secondaryGray.500"
                    }
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? "brand.500"
                        : "gray.700"
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
                      ? "blue"
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
