import { Box, SimpleGrid } from "@chakra-ui/react";
import { useStack } from "services/stack/useStack";
import { BookBarChart } from "./BookBarChart";
import { BookTableList } from "./BookTableList";
import { TotalNumberOfBooks } from "./TotalNumberOfBooks";
import { TotalPagesOfBooks } from "./TotalPagesOfBooks";
import { TotalPriceOfBooks } from "./TotalPriceOfBooks";

export const Dashboard = () => {
  const { stacks, isLoading } = useStack();

  return (
    <Box>
      <SimpleGrid columns={3} gap="20px" mb="20px">
        <TotalNumberOfBooks data={stacks} isLoading={isLoading} />
        <TotalPriceOfBooks data={stacks} isLoading={isLoading} />
        <TotalPagesOfBooks data={stacks} isLoading={isLoading} />
      </SimpleGrid>
      <SimpleGrid columns={2} gap="20px" mb="20px">
        <BookBarChart />
        <BookTableList />
      </SimpleGrid>
    </Box>
  );
};
