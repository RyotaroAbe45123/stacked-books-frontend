import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useMobileContext } from "contexts/MobileContext";
import { Fragment, useCallback, useEffect, useState } from "react";
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

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
      setIsLoaded(true);
    } else {
      setImageEndpoint({
        openbd: "",
        iss: "",
      });
      setTitle("");
      setAuthors("");
      setPublisher("");
      setIsLoaded(false);
    }
  }, [inputValue, searchBookInfo]);

  if (!isMobile) {
    return (
      <Flex w="100%" gap="15px" alignItems="center">
        <Box>
          {[
            words.register.searchResult.title,
            words.register.searchResult.authors,
            words.register.searchResult.publisher,
          ].map((word, index) => (
            <Text key={word} marginTop={index === 0 ? "0px" : "10px"}>
              {word}
            </Text>
          ))}
        </Box>
        <Box>
          {[title, authors, publisher].map((element, index) => (
            <Skeleton
              height="24px"
              width="450px"
              startColor={theme.noImage}
              endColor={theme.noImage}
              opacity={1}
              isLoaded={isLoaded}
            >
              <Text
                key={`${index}/${element}`}
                w="450px"
                maxWidth="450px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                marginTop={index === 0 ? "0px" : "10px"}
              >
                {element}
              </Text>
            </Skeleton>
          ))}
        </Box>
        <Flex alignItems="center" flexDirection="column" gap="5px">
          <Text>{words.register.searchResult.image}</Text>
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
                    w="150px"
                    h="200px"
                    bg={theme.noImage}
                    color={theme.noImage}
                  >
                    {words.books.pagination.noImage}
                  </Flex>
                }
              />
            }
            alt="searchImage"
            w="150px"
            h="200px"
            objectFit="cover"
          />
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Box w="100%">
        <Flex>
          <Box>
            {[title, authors, publisher].map((element, index) => (
              <Fragment key={`${index}/${element}`}>
                <Text marginTop={index === 0 ? "0px" : "10px"}>
                  {index === 0
                    ? words.register.searchResult.title
                    : index === 1
                    ? words.register.searchResult.authors
                    : words.register.searchResult.publisher}
                </Text>
                <Skeleton
                  height="24px"
                  width="250px"
                  startColor={theme.noImage}
                  endColor={theme.noImage}
                  opacity={1}
                  isLoaded={isLoaded}
                >
                  <Text
                    w="250px"
                    maxWidth="250px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {element}
                  </Text>
                </Skeleton>
              </Fragment>
            ))}
          </Box>
        </Flex>
        <Flex alignItems="center" marginTop="10px" flexDirection="column">
          <Text>{words.register.searchResult.image}</Text>
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
      </Box>
    );
  }
};
