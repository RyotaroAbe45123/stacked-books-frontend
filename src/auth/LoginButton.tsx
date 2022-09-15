import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const options = {
    redirect_uri: window.location.origin,
    audience: "https://dev-c0lrddj1.us.auth0.com/api/v2/",
  };
  return <Button onClick={() => loginWithRedirect(options)}>Log In</Button>;
};
