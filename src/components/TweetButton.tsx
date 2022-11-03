import { AiOutlineTwitter } from "react-icons/ai";
import { Box, Icon, Button, Flex } from "@chakra-ui/react";
import { theme } from "theme/theme";
import { words } from "utils/words";
import { hashTags, tweetUrl } from "utils/config";
import { createTweet } from "functions/utils";

type Props = {
  text: string;
};

export const TweetButton = ({ text }: Props) => {
  return (
    <a
      className="twitter-share-button"
      href={`${tweetUrl}?hashtags=${hashTags}&text=${createTweet(text)}`}
      target="_blank"
      rel="noreferrer"
    >
      <Button
        bg={theme.twitterColor}
        color={theme.mainColor}
        padding="1px 12px 1px 12 px"
        borderRadius="9999px"
        w="81px"
        h="28px"
      >
        <Flex alignItems="center" justifyContent="center" verticalAlign="top">
          <Icon as={AiOutlineTwitter} w="18px" h="18px" />
          <Box
            marginLeft="5px"
            fontWeight="500"
            fontSize="13px"
            lineHeight="26px"
          >
            {words.dashboard.twitter.buttonName}
          </Box>
        </Flex>
      </Button>
    </a>
  );
};
