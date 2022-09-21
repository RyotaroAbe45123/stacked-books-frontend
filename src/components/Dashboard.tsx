import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetStacks } from "services/stack/useGetStacks";
import { Stacks } from "types/api";
import { BookBarChart } from "./BookBarChart";
import { BookTableList } from "./BookTableList";
import { TotalNumberOfBooks } from "./TotalNumberOfBooks";
import { TotalPagesOfBooks } from "./TotalPagesOfBooks";
import { TotalPriceOfBooks } from "./TotalPriceOfBooks";

export const Dashboard = () => {
  const { data } = useGetStacks();

  const [stacks, setStacks] = useState<Stacks[]>();

  useEffect(() => {
    if (data !== undefined) {
      setStacks(data);
    }
  }, [data]);

  return (
    <Box>
      <SimpleGrid columns={3} gap="20px" mb="20px">
        <TotalNumberOfBooks data={data} />
        <TotalPriceOfBooks data={stacks} />
        <TotalPagesOfBooks data={stacks} />
      </SimpleGrid>
      <SimpleGrid columns={2} gap="20px" mb="20px">
        <BookBarChart />
        <BookTableList />
      </SimpleGrid>
    </Box>
  );
};
