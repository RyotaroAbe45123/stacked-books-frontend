import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { Card } from "components/Card";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";

export const InputPerformance = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

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

  useEffect(() => {
    getAccessToken();
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const stack = async (isbn: string) => {
    const url = "http://localhost:5000/stack";
    const data = {
      isbn: isbn,
    };
    const headers = {
      headers: {
        token: accessToken,
      },
    };
    try {
      const response = await axios.post(url, data, headers);
      console.log(response);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const onClick = () => {
    stack(inputValue);
  };

  return (
    <Box>
      <Card>
        <Box
          w="100%"
          h="300px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Input placeholder="ISBN" onChange={(e) => onChange(e)} width="70%" />
          <Button marginLeft="10px" onClick={() => onClick()}>
            stack!
          </Button>
        </Box>{" "}
      </Card>
    </Box>
  );
};
