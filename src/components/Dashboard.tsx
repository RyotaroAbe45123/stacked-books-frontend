import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetStacks } from "services/stack/useGetStacks";
import { Card } from "./Card";
import { SpinnerComponent } from "./SpinnerComponent";

type Stack = {
  isbn: number;
  timestamp: string;
};

export const Dashboard = () => {
  const { data, isLoading } = useGetStacks();

  const [stacks, setStacks] = useState<Stack[]>();

  useEffect(() => {
    if (data !== undefined) {
      setStacks(data);
    }
  }, [isLoading]);

  return (
    <Box>
      <Grid column={1} mb="20px">
        <Card heightPixel={300}>
          <Box>
            {isLoading ? (
              <SpinnerComponent />
            ) : (
              <>
                {stacks?.map((stack, index) => (
                  <div key={index}>
                    <div>{stack.isbn}</div>
                  </div>
                ))}
              </>
            )}
          </Box>
        </Card>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap="20px">
        <GridItem>
          <Card heightPixel={100}>
            <Box>jj</Box>
          </Card>
        </GridItem>
        <GridItem>
          <Card heightPixel={200}>
            <Box>kk</Box>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};
