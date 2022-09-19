import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { Home } from "pages/Home";
import { Register } from "pages/Register";
import { useNavigate } from "react-router-dom";
import { theme } from "theme/theme";

export const Sidebar = () => {
  const navigate = useNavigate();
  const routes = [
    {
      name: "home",
      path: "/home",
      component: Home,
    },
    {
      name: "register",
      path: "/register",
      component: Register,
    },
  ];
  const onClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box position="fixed" height="100%" width="20%">
      <Box display="flex" justifyContent="center" alignItems="center" h="100px">
        <Heading>Stacked Books</Heading>
      </Box>
      <Divider />
      {routes.map((route) => (
        <Box key={route.name} display="flex" justifyContent="center">
          <Button
            w="60%"
            mt="20px"
            bg={theme.subColor}
            onClick={() => onClick(route.path)}
          >
            {route.name}
          </Button>
        </Box>
      ))}
    </Box>
  );
};
