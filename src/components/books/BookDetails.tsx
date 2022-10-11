import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBook } from "services/book/useBook";
import { theme } from "theme/theme";
import { bookImageEndpoint, pageSize } from "utils/config";
import { words } from "utils/words";
import { Card } from "../Card";
import { SpinnerComponent } from "../SpinnerComponent";
import { NoStacks } from "./NoStacks";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
                        <Flex justifyContent="center" marginY="20px">
                          <Text w="150px" noOfLines={3}>
                            {book.title}
                          </Text>
                        </Flex>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Flex justifyContent="space-between" marginTop="30px">
                    {offset !== 0 ? (
                      <Button onClick={() => onClickPrevious()}>
                        <Icon as={FaArrowLeft} />
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    {(offset + 1) * pageSize < count ? (
                      <Button onClick={() => onClickNext()}>
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
