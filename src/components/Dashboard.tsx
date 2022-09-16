import { useAuth0 } from "@auth0/auth0-react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card";

type Stack = {
  isbn: number;
  timestamp: Date;
};

export const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState<string>("");
  const [stacks, setStacks] = useState<Stack[]>();

  const getAccessToken = async () => {
    const domain = process.env.REACT_APP_DOMAIN
      ? process.env.REACT_APP_DOMAIN
      : "";
    try {
      const response = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });
      setAccessToken(response);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getStacks = async () => {
    const url = "http://localhost:5000/stacks";
    const headers = {
      headers: {
        token: accessToken,
      },
    };
    try {
      const response = await axios.get(url, headers);
      setStacks(response.data);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getAccessToken();
    getStacks();
  }, []);

  return (
    <Box>
      <Grid column={1} mb="20px">
        <Card>
          <Box h="300px">
            {stacks?.map((stack) => (
              <Box key={stack.isbn}>{stack.isbn}</Box>
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
