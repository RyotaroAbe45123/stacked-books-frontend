import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LogoutButton } from "auth/LogoutButton";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "Routes";
import { theme } from "theme/theme";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/stacked-books-logo.png";
import { TweetButton } from "components/TweetButton";
import { useStack } from "services/stack/useStack";
import { useEffect, useState } from "react";

export const MobileHeader = () => {
  const { stacks } = useStack();

  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (stacks !== undefined) {
      const numOfBooks = stacks.length;
      let totalPrice = 0;
      let totalPages = 0;
      stacks.forEach((i) => {
        totalPrice += i.price ?? 0;
        totalPages += i.pages ?? 0;
      });
      setText(
        `${numOfBooks}冊の本を積み上げました！%0D%0A${totalPrice.toLocaleString()}円を本に使いました！%0D%0A${totalPages.toLocaleString()}ページ分の本を積み上げました！`,
      );
    }
  }, [stacks]);

  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const getActivePageName = (pathName: string) => {
    const pageName = routes.find((route) => route.path === pathName);
    return pageName?.name ? pageName?.name : "";
  };
  return (
    <Box
      position="fixed"
      w="100%"
      h="70px"
      bg={theme.subColor}
      borderRadius="10px"
      paddingX="20px"
      zIndex={2}
    >
      <Flex h="100%" alignItems="center" justifyContent="space-between">
        <Flex>
          <IconButton
            aria-label="menu"
            icon={<Icon as={GiHamburgerMenu} w="18px" h="18px" />}
            onClick={onOpen}
            w="36px"
            h="36px"
            minW="36px"
            bg={theme.mainColor}
            borderColor={theme.activeColor}
            borderWidth={2}
          />
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent maxW="50%">
              <DrawerCloseButton />
              <DrawerHeader>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  h="50px"
                >
                  <NavLink to="/home" onClick={onClose}>
                    <Flex justifyContent="center" alignItems="center">
                      <Image src={Logo} w="80%" />
                    </Flex>
                  </NavLink>
                </Box>
              </DrawerHeader>
              <Divider />
              <DrawerBody>
                <Box ps="20px" pe="1px">
                  {routes.map((route) => (
                    <NavLink key={route.name} to={route.path} onClick={onClose}>
                      <Box>
                        <HStack py="5px">
                          <Flex
                            w="100%"
                            alignItems="start"
                            justifyContent="center"
                          >
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
                                activeRoute(route.path.toLowerCase())
                                  ? "bold"
                                  : "normal"
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
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Flex alignItems="center">
            <Text fontWeight="bold" marginLeft="10px">
              {getActivePageName(location.pathname)}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Box marginRight="10px">
            <TweetButton text={text} />
          </Box>
          <LogoutButton />
        </Flex>
      </Flex>
    </Box>
  );
};
