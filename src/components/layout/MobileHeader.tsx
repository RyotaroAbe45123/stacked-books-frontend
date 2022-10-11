import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LogoutButton } from "auth/LogoutButton";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "Routes";
import { theme } from "theme/theme";
import { words } from "utils/words";
import { GiHamburgerMenu } from "react-icons/gi";

export const MobileHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getActivePageName = (pathName: string) => {
    const pageName = routes.find((route) => route.path === pathName);
    return pageName?.name ? pageName?.name : "Not Found";
  };
  return (
    <Box
      position="fixed"
      w="100%"
      h="70px"
      bg={theme.subColor}
      borderRadius="10px"
      paddingX="20px"
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
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>basic drawer</DrawerHeader>
              <DrawerBody>
                <p>ppp</p>
                <p>ppp</p>
                <p>ppp</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Flex alignItems="center">
            <Text
              // fontSize="1rem"
              fontWeight="bold"
              marginLeft="10px"
            >
              {getActivePageName(location.pathname)}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Button
            onClick={() => navigate("/register")}
            bg={theme.mainColor}
            marginRight="10px"
          >
            {words.header.stackButton}
          </Button>
          <LogoutButton />
        </Flex>
      </Flex>
    </Box>
  );
};
