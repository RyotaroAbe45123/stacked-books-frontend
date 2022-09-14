import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Card } from "./Card";

export const Dashboard = () => {
  return (
    <Box>
      <Grid column={1} mb="20px">
        <Card>
          <Box h="300px">ii</Box>
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
