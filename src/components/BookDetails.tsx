import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useBook } from "services/book/useBook";
import { theme } from "theme/theme";
import { Card } from "./Card";
import { SpinnerComponent } from "./SpinnerComponent";

export const BookDetails = () => {
  const { books, isLoading } = useBook();

  const bookImageEndpoint = "https://iss.ndl.go.jp/thumbnail/";

  return (
    <Box>
      <Card>
        <Box w="100%" h="100%" padding="30px">
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <SimpleGrid
              minChildWidth="300px"
              spacing="20px"
              justifyItems="center"
            >
              {books?.map((book) => (
                <Box
                  key={book.isbn}
                  w="300px"
                  h="450px"
                  bg={theme.subColor}
                  borderRadius="30px"
                >
                  <Flex justifyContent="center" h="300px" marginTop="30px">
                    <Image
                      src={`${bookImageEndpoint}${book.isbn}`}
                      w="200px"
                      objectFit="cover"
                    />
                  </Flex>
                  <Box padding="20px">
                    <Text>{book.title}</Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Card>
    </Box>
  );
};
