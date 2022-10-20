import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useMobileContext } from "contexts/MobileContext";
import { useCallback, useEffect, useState } from "react";
import { theme } from "theme/theme";
import { BookInfoType } from "types/api";
import {
  issBookImageEndpoint,
  openbdBookImageEndpoint,
  openbdEndpoint,
} from "utils/config";
import { words } from "utils/words";

type Props = {
  inputValue: number | null;
};

export const SearchResultField = ({ inputValue }: Props) => {
  const { isMobile } = useMobileContext();

  const [title, setTitle] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");

  const [imageEndpoint, setImageEndpoint] = useState<{
    openbd: string;
    iss: string;
  }>({
    openbd: "",
    iss: "",
  });

  const searchBookInfo = useCallback(async () => {
    const settings = {
      params: {
        isbn: inputValue,
      },
    };
    const response: AxiosResponse<BookInfoType[]> = await axios.get(
      openbdEndpoint,
      settings,
    );
    if (response.data && response.data[0] !== null) {
      const title =
        response.data[0].onix.DescriptiveDetail.TitleDetail.TitleElement
          .TitleText.content;
      setTitle(title ? title : "");
      const author =
        response.data[0].onix.DescriptiveDetail.Contributor[0].PersonName
          .content;
      setAuthors(author ? author : "");
      const publisher =
        response.data[0].onix.PublishingDetail.Imprint.ImprintName;
      setPublisher(publisher ? publisher : "");
    } else {
      setTitle("");
    }
  }, [inputValue]);

  useEffect(() => {
    if (String(inputValue).length === 13) {
      setImageEndpoint({
        openbd: `${openbdBookImageEndpoint}${inputValue}.jpg`,
        iss: `${issBookImageEndpoint}${inputValue}`,
      });
      searchBookInfo();
    } else {
      setImageEndpoint({
        openbd: "",
        iss: "",
      });
      setTitle("");
      setAuthors("");
      setPublisher("");
    }
  }, [inputValue, searchBookInfo]);

  return (
    <Flex w="100%" gap="10px" alignItems="center">
      <Box>
        <Text marginBottom="10px">{words.register.searchResult.title}</Text>
        <Text marginBottom="10px">{words.register.searchResult.authors}</Text>
        <Text>{words.register.searchResult.publisher}</Text>
      </Box>
      <Box>
        <Text
          w={isMobile ? "100px" : "300px"}
          maxWidth="300px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          marginBottom="10px"
        >
          {title}
        </Text>
        <Text
          w={isMobile ? "100px" : "300px"}
          maxWidth="300px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          marginBottom="10px"
        >
          {authors}
        </Text>
        <Text
          w={isMobile ? "100px" : "300px"}
          maxWidth="300px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {publisher}
        </Text>
      </Box>
      <Image
        src={imageEndpoint.openbd}
        fallback={
          <Image
            src={imageEndpoint.iss}
            fallback={
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w="100px"
                h="150px"
                bg={theme.noImage}
                color={theme.noImage}
              >
                {words.books.pagination.noImage}
              </Flex>
            }
          />
        }
        alt="searchImage"
        w="100px"
        h="150px"
        objectFit="cover"
      />
    </Flex>
  );
};
