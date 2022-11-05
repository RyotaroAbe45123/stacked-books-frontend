import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LogoutButton } from "auth/LogoutButton";
import { TweetButton } from "components/TweetButton";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "Routes";
import { useStack } from "services/stack/useStack";
import { theme } from "theme/theme";
import { words } from "utils/words";

export const Header = () => {
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
  const navigate = useNavigate();

  const getActivePageName = (pathName: string) => {
    const pageName = routes.find((route) => route.path === pathName);
    return pageName?.name ? pageName?.name : "";
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
        <Flex alignItems="center">
          <Box marginRight="10px">
            <TweetButton text={text} />
          </Box>
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
