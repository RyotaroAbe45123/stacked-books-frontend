import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useBook } from "services/book/useBook";
import { theme } from "theme/theme";
import {
  issBookImageEndpoint,
  openbdBookImageEndpoint,
  pageSize,
} from "utils/config";
import { words } from "utils/words";
import { Card } from "../Card";
import { SpinnerComponent } from "../SpinnerComponent";
import { NoStacks } from "./NoStacks";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useMobileContext } from "contexts/MobileContext";

export const BookDetails = () => {
  const { isMobile } = useMobileContext();

  const [offset, setOffset] = useState<number>(0);
  const { books, count, isLoading } = useBook({
    offset: offset,
    pageSize: pageSize,
  });

  const onClickNext = useCallback(() => {
    setOffset(offset + 1);
  }, [offset]);

  const onClickPrevious = useCallback(() => {
    setOffset(offset - 1);
  }, [offset]);

  return (
    <Box>
      <Card>
        <Box w="100%" h="100%" padding="30px">
          {isLoading ? (
            <Box h="500px">
              <SpinnerComponent />
            </Box>
          ) : (
            <>
              {books && books.length !== 0 ? (
                <>
                  <SimpleGrid
                    columns={{ base: 2, md: 4 }}
                    justifyItems="center"
                    spacingX={isMobile ? "50px" : "75px"}
                    spacingY={isMobile ? "10px" : "50px"}
                  >
                    {books.map((book) => (
                      <Box
                        key={book.isbn}
                        w={isMobile ? "150px" : "200px"}
                        h={isMobile ? "250px" : "100%"}
                        bg={theme.subColor}
                        borderRadius={isMobile ? "15px" : "30px"}
                      >
                        <Flex
                          justifyContent="center"
                          marginTop={isMobile ? "10px" : "30px"}
                        >
                          <Image
                            src={
                              book.has_image
                                ? `${openbdBookImageEndpoint}${book?.isbn}.jpg`
                                : `${issBookImageEndpoint}${book?.isbn}`
                            }
                            fallback={
                              <Flex
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                w="100px"
                                h="150px"
                                bg={theme.inactiveColor}
                                color={theme.mainText}
                              >
                                {words.books.pagination.noImage}
                              </Flex>
                            }
                            alt={book.title}
                            w="100px"
                            h="150px"
                            objectFit="cover"
                          />
                        </Flex>
                        <Flex
                          justifyContent="center"
                          marginY={isMobile ? "5px" : "20px"}
                        >
                          <Text w={isMobile ? "100px" : "150px"} noOfLines={3}>
                            {book.title}
                          </Text>
                        </Flex>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Flex justifyContent="space-between" marginTop="30px">
                    {offset !== 0 ? (
                      <Button onClick={onClickPrevious}>
                        <Icon as={FaArrowLeft} />
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    {(offset + 1) * pageSize < count ? (
                      <Button onClick={onClickNext}>
                        <Icon as={FaArrowRight} />
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Flex>
                  <Text textAlign="center">
                    {offset + 1} / {Math.ceil(count / pageSize)}
                  </Text>
                </>
              ) : (
                <NoStacks />
              )}
            </>
          )}
        </Box>
      </Card>
    </Box>
  );
};
