import { Box, SimpleGrid } from "@chakra-ui/react";
import { useStack } from "services/stack/useStack";
import { DailyBookBarChart } from "./books/DailyBookBarChart";
import { BookTableList } from "./BookTableList";
import { MonthlyNumberOfBooks } from "./books/MonthlyNumberOfBooks";
import { TotalNumberOfBooks } from "./books/TotalNumberOfBooks";
import { TotalPagesOfBooks } from "./pages/TotalPagesOfBooks";
import { TotalPriceOfBooks } from "./price/TotalPriceOfBooks";
import { MonthlyBookBarChart } from "./books/MonthlyBookBarChart";
import { MonthlyPriceOfBooks } from "./price/MonthlyPriceOfBooks";
import { MonthlyPagesOfBooks } from "./pages/MonthlyPagesOfBooks";

export const Dashboard = () => {
  const { stacks, isLoading } = useStack();

  return (
    <Box>
      <SimpleGrid columns={{ sm: 1, lg: 3 }} gap="20px" mb="20px">
        <TotalNumberOfBooks data={stacks} isLoading={isLoading} />
        <TotalPriceOfBooks data={stacks} isLoading={isLoading} />
        <TotalPagesOfBooks data={stacks} isLoading={isLoading} />
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, lg: 3 }} gap="20px" mb="20px">
        <MonthlyNumberOfBooks data={stacks} isLoading={isLoading} />
        <MonthlyPriceOfBooks data={stacks} isLoading={isLoading} />
        <MonthlyPagesOfBooks data={stacks} isLoading={isLoading} />
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap="20px" mb="20px">
        <DailyBookBarChart data={stacks} isLoading={isLoading} />
        <MonthlyBookBarChart data={stacks} isLoading={isLoading} />
      </SimpleGrid>
      <SimpleGrid columns={1}>
        <BookTableList data={stacks} isLoading={isLoading} />
      </SimpleGrid>
    </Box>
  );
};
