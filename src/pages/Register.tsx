// import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { Card } from "components/Card";
import { useAuthContext } from "contexts/AuthContext";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useAuthGuard } from "utils/Auth";

export const Register = () => {
  useAuthGuard();

  const { token } = useAuthContext();
  console.log(`tt: ${token}`);

  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const stack = async (isbn: string) => {
    const url = "http://localhost:5000/stack";
    const data = {
      isbn: isbn,
    };
    const headers = {
      headers: {
        token: token ?? "",
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
          h="400px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            w="100%"
            h="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              placeholder="ISBN"
              onChange={(e) => onChange(e)}
              width="70%"
            />
            <Button marginLeft="10px" onClick={() => onClick()}>
              stack!
            </Button>
          </Box>
          <Box
            w="100%"
            h="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              placeholder="ISBN"
              onChange={(e) => onChange(e)}
              width="70%"
            />
            <Button marginLeft="10px" onClick={() => onClick()}>
              unstack!
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
