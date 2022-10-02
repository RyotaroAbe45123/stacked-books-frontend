// import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useBook } from "services/book/useBook";
import { theme } from "theme/theme";
import { Card } from "./Card";
import { SpinnerComponent } from "./SpinnerComponent";

const pageSize = 6;

export const BookDetails = () => {
  const [offset, setOffset] = useState<number>(0);
  const { books, count, isLoading } = useBook({
    offset: offset,
    pageSize: pageSize,
  });

  const bookImageEndpoint = "https://iss.ndl.go.jp/thumbnail/";

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
            <SimpleGrid
              minChildWidth="250px"
              spacing="20px"
              justifyItems="center"
            >
              {books ? (
                books.map((book) => (
                  <Box
                    key={book.isbn}
                    w="250px"
                    h="450px"
                    bg={theme.subColor}
                    borderRadius="30px"
                  >
                    <Flex justifyContent="center" h="300px" marginTop="30px">
                      <Image
                        src={`${bookImageEndpoint}${book?.isbn}`}
                        fallbackSrc="https://via.placeholder.com/200x300"
                        alt={book.title}
                        w="200px"
                        objectFit="cover"
                      />
                    </Flex>
                    <Flex justifyContent="center" marginTop="20px">
                      <Text w="180px" noOfLines={3}>
                        {book.title}
                      </Text>
                    </Flex>
                  </Box>
                ))
              ) : (
                <div>null</div>
              )}
            </SimpleGrid>
          )}
          <Flex justifyContent="space-between" paddingX="20px" marginTop="50px">
            {offset !== 0 ? (
              <Button onClick={() => onClickPrevious()}>previous</Button>
            ) : (
              <div></div>
            )}
            {(offset + 1) * pageSize < count ? (
              <Button onClick={() => onClickNext()}>next</Button>
            ) : (
              <div></div>
            )}
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};
