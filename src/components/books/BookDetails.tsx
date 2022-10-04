import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useBook } from "services/book/useBook";
import { theme } from "theme/theme";
import { bookImageEndpoint, pageSize } from "utils/config";
import { Card } from "../Card";
import { SpinnerComponent } from "../SpinnerComponent";
import { NoStacks } from "./NoStacks";

export const BookDetails = () => {
  const [offset, setOffset] = useState<number>(0);
  const { books, count, isLoading } = useBook({
    offset: offset,
    pageSize: pageSize,
  });

  const onClickNext = () => {
    setOffset(offset + 1);
  };
  const onClickPrevious = () => {
    setOffset(offset - 1);
  };

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
                  <SimpleGrid columns={4} justifyItems="center" spacing="50px">
                    {books.map((book) => (
                      <Box
                        key={book.isbn}
                        w="200px"
                        bg={theme.subColor}
                        borderRadius="30px"
                      >
                        <Flex justifyContent="center" marginTop="30px">
                          <Image
                            src={`${bookImageEndpoint}${book?.isbn}`}
                            fallback={
                              <Box
                                w="100px"
                                h="150px"
                                bg={theme.inactiveColor}
                              ></Box>
                            }
                            alt={book.title}
                            w="100px"
                            h="150px"
                            objectFit="cover"
                          />
                        </Flex>
                        <Flex justifyContent="center" marginY="20px">
                          <Text w="150px" noOfLines={3}>
                            {book.title}
                          </Text>
                        </Flex>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Flex
                    justifyContent="space-between"
                    paddingX="20px"
                    marginTop="50px"
                  >
                    {offset !== 0 ? (
                      <Button onClick={() => onClickPrevious()}>
                        <ChevronLeftIcon w={8} h={8} />
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    {(offset + 1) * pageSize < count ? (
                      <Button onClick={() => onClickNext()}>
                        <ChevronRightIcon w={8} h={8} />
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Flex>
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
