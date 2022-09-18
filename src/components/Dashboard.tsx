import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "./Card";

type Stack = {
  isbn: number;
  timestamp: string;
};

export const Dashboard = () => {
  const [stacks, setStacks] = useState<Stack[]>();
  useEffect(() => {
    setStacks([]);
  }, []);

  return (
    <Box>
      <Grid column={1} mb="20px">
        <Card>
          <Box h="300px">
            {stacks?.map((stack) => (
              <>
                <Box key={stack.isbn}>{stack.isbn}</Box>
                <Box key={stack.isbn}>{stack.timestamp}</Box>
              </>
            ))}
          </Box>
        </Card>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap="20px">
        <GridItem>
          <Card>
            <Box h="100px">jj</Box>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <Box h="200px">kk</Box>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};
