import { Box, Flex, Image } from "@chakra-ui/react";
// import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { LoginButton } from "auth/LoginButton";
import { useMobileContext } from "contexts/MobileContext";
import { theme } from "theme/theme";
import { words } from "utils/words";
import image from "../assets/background-min.png";
// import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

export const Login = () => {
  const { isMobile } = useMobileContext();
  return (
    <Box position="relative" w="100vw" h="100vh" bg={theme.subColor}>
      <Image
        position="absolute"
        top={isMobile ? "0%" : "20%"}
        src={image}
        w="100vw"
        h={isMobile ? "100vh" : "60vh"}
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
      {/* <Flex
        position="absolute"
        top="75%"
        justifyContent="center"
        alignItems="center"
        width="100%"
        // bg={theme.subColor}
      >
        <Icon as={AiFillGithub} w="30px" h="30px" />
        <Icon as={AiFillTwitterCircle} w="30px" h="30px" />
      </Flex> */}
    </Box>
  );
};
