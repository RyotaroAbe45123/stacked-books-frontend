import { Box, Flex, Image } from "@chakra-ui/react";
import { LoginButton } from "auth/LoginButton";
import { theme } from "theme/theme";
import { words } from "utils/words";
import image from "../assets/background.png";

export const Login = () => {
  return (
    <Box position="relative">
      <Image
        src={image}
        w="100vw"
        h="100vh"
        objectFit="cover"
        alt="login"
        opacity="0.6"
        loading="lazy"
      />
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        fontSize="64px"
        fontWeight="bold"
        color={theme.titleText}
        textShadow="0 0.02em 0.02em rgba(255, 255, 255, 1)"
        justifyContent="center"
        lineHeight="1.25em"
      >
        <div>{words.login.title}</div>
      </Flex>
      <Flex
        position="absolute"
        top="70%"
        left="50%"
        transform="translate(-50%, -50%)"
        justifyContent="center"
        alignItems="center"
        width="300px"
      >
        <LoginButton />
      </Flex>
    </Box>
  );
};
