import { Box } from "@chakra-ui/react";
import { BookDetails } from "components/books/BookDetails";
import { useAuthGuard } from "utils/Auth";

export const Books = () => {
  useAuthGuard();
  return (
    <Box>
      <BookDetails />
    </Box>
  );
};
