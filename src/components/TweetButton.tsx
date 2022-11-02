import { AiOutlineTwitter } from "react-icons/ai";
import { Box, Icon, Button, Flex } from "@chakra-ui/react";

export const TweetButton = () => {
  return (
    <a
      className="twitter-share-button"
      href="https://twitter.com/intent/tweet?text=Hello%20world"
      target="_blank"
      rel="noreferrer"
    >
      <Button
        bg="#1d9bf0"
        color="#fff"
        padding="1px 12px 1px 12 px"
        borderRadius="9999px"
        w="81px"
        h="28px"
      >
        <Flex alignItems="center" justifyContent="center">
          <Icon as={AiOutlineTwitter} w="18px" h="18px" />
          <Box
            marginLeft="5px"
            fontWeight="500"
            fontSize="13px"
            lineHeight="26px"
          >
            Tweet
          </Box>
        </Flex>
      </Button>
    </a>
  );
};
