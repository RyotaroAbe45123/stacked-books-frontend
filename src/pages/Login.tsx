import { Box, Flex, Image } from "@chakra-ui/react";
import { LoginButton } from "auth/LoginButton";
import { useMobileContext } from "contexts/MobileContext";
import { setFillHeight } from "functions/utils";
import { useCallback } from "react";
import { theme } from "theme/theme";
import { words } from "utils/words";
import image from "../assets/background-min.png";

export const Login = () => {
  const { isMobile } = useMobileContext();

  const setFillHeightFucntion = useCallback(setFillHeight, []);
  window.addEventListener("resize", setFillHeightFucntion);
  setFillHeightFucntion();

  return (
    <Box
      position="relative"
      h="100vh"
      minHeight={isMobile ? "calc(var(--vh, 1vh) * 100)" : "60vh"}
      bg={theme.subColor}
    >
      <Image
        position="absolute"
        top={isMobile ? "0%" : "20%"}
        src={image}
        w="100vw"
        h={isMobile ? "100vh" : "60vh"}
        minHeight={isMobile ? "calc(var(--vh, 1vh) * 100)" : "60vh"}
        objectFit="cover"
        alt=""
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
        <Box>{words.login.title}</Box>
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
