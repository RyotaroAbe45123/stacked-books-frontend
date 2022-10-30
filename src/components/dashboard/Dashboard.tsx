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

export const Dashboard = () => {
  const { stacks, isLoading } = useStack();

  return (
    <Box>
      {/* <a
        className="twitter-share-button"
        href="https://twitter.com/intent/tweet"
      >
        Tweet
      </a>
      <a
        className="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=Hello%20world"
      >
        Tweet2
      </a>
      <a
        className="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=Hello%20world"
        data-size="large"
      >
        Tweet3
      </a>
      <a
        id="b"
        className="btn"
        href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fdeveloper.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=Guides%20%7C%20Docs%20%7C%20Twitter%20Developer%20Platform&url=https%3A%2F%2Fdeveloper.twitter.com%2Fen%2Fdocs%2Ftwitter-for-websites%2Ftweet-button%2Foverview"
      ></a> */}
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
        <StacksChart data={stacks} isLoading={isLoading} />
        <CategoryChart data={stacks} isLoading={isLoading} />
      </SimpleGrid>
      <SimpleGrid columns={1}>
        <BookTableList data={stacks} isLoading={isLoading} />
      </SimpleGrid>
    </Box>
  );
};
