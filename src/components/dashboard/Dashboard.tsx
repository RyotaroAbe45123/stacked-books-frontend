import { Box, SimpleGrid } from "@chakra-ui/react";
import { useStack } from "services/stack/useStack";
import { BookTableList } from "./BookTableList";
import { MonthlyNumberOfBooks } from "./books/MonthlyNumberOfBooks";
import { TotalNumberOfBooks } from "./books/TotalNumberOfBooks";
import { TotalPagesOfBooks } from "./pages/TotalPagesOfBooks";
import { TotalPriceOfBooks } from "./price/TotalPriceOfBooks";
import { MonthlyPriceOfBooks } from "./price/MonthlyPriceOfBooks";
import { MonthlyPagesOfBooks } from "./pages/MonthlyPagesOfBooks";
import { StacksChart } from "./books/StacksChart";
import { CategoryChart } from "./books/CategoryChart";
import { useMobileContext } from "contexts/MobileContext";

export const Dashboard = () => {
  const { isMobile } = useMobileContext();

  const { stacks, isLoading } = useStack();

  return (
    <Box>
      <SimpleGrid columns={{ sm: 1, lg: 3 }} gap="20px" mb="20px">
        <TotalNumberOfBooks data={stacks} isLoading={isLoading} />
        <TotalPriceOfBooks data={stacks} isLoading={isLoading} />
        <TotalPagesOfBooks data={stacks} isLoading={isLoading} />
      </SimpleGrid>
      {!isMobile && (
        <SimpleGrid columns={{ sm: 1, lg: 3 }} gap="20px" mb="20px">
          <MonthlyNumberOfBooks data={stacks} isLoading={isLoading} />
          <MonthlyPriceOfBooks data={stacks} isLoading={isLoading} />
          <MonthlyPagesOfBooks data={stacks} isLoading={isLoading} />
        </SimpleGrid>
      )}
      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap="20px" mb="20px">
        <StacksChart data={stacks} isLoading={isLoading} />
        <CategoryChart data={stacks} isLoading={isLoading} />
      </SimpleGrid>
      <SimpleGrid columns={1}>
        <BookTableList stacks={stacks} isLoading={isLoading} />
      </SimpleGrid>
    </Box>
  );
};
