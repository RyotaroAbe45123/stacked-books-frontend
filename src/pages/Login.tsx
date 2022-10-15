import { Box, Flex } from "@chakra-ui/react";
// import { LoginButton } from "auth/LoginButton";
// import { theme } from "theme/theme";
// import { SpinnerComponent } from "components/SpinnerComponent";
// import { words } from "utils/words";
import image from "../assets/a.jpg";

type LoginProps = {
  isLoading: boolean;
};

export const Login = ({ isLoading }: LoginProps) => {
  console.log(isLoading);
  return (
    <Box position="relative">
      <Flex>
        {/* <Flex
        position="relative"
        // bg="gray"
        w="100vw"
        h="100vh"
        backgroundImage="url('../assets/a.jpg')"
        _before={{
          content: "",
          position: "absolute",
          top: "0px",
          right: "0px",
          left: "0px",
          bottom: "0px",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        }}
        // bg={theme.subColor}
      > */}
        {/* <Flex
          position="absolute"
          top="50%"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            fontWeight="bold"
            fontSize="64px"
            color={theme.mainColor}
            // backgroundColor="rgba(255, 255, 255, 0.5)"
          >
            Stacked Books | 積み読
          </Heading>
        </Flex> */}
        {/* <Image
          src={image}
          alt="login"
          opacity={0.6}
          // opacity="0.5"
          // zIndex={0}
          w="100vw"
          // w="40%"
          h="100vh"
          objectFit="cover"
        /> */}
        {/* <Box
          fontSize="64px"
          fontWeight="bold"
          color="#fff"
          position="absolute"
          top="50%"
          left="50%"
          transform="translateX(-50%) translateY(-50%)"
        >
          stacked books
        </Box> */}
        {/* <Box position="relative" overflow="hidden"></Box> */}
        {/* <Box w="100vw" h="100vh" backgroundColor="rgba(255, 255, 255, 0.5)" /> */}
        {/* <Flex
          position="absolute"
          top="80%"
          w="100%"
          justifyContent="center"
          alignItems="center"
          zIndex={0}
        >
          <LoginButton />
        </Flex> */}
      </Flex>
      {/* <Heading>{words.login.title}</Heading> */}
      {/* <SpinnerComponent /> */}
    </Box>
  );
  // return (
  //   <Box
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     marginTop="20%"
  //   >
  //     {isLoading ? (
  //       <SpinnerComponent />
  //     ) : (
  //       <Box>
  //         <img src={image} />
  //         {/* <Image src={image} /> */}
  //         <Heading>{words.login.title}</Heading>
  //         <Box display="flex" justifyContent="center" marginTop="10px">
  //           <LoginButton />
  //         </Box>
  //       </Box>
  //     )}
  //   </Box>
  // );
};
