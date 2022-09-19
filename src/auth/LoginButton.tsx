import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const domain = process.env.REACT_APP_DOMAIN ?? "";
  const options = {
    redirect_uri: window.location.origin,
    audience: `https://${domain}/api/v2/`,
  };
  return <Button onClick={() => loginWithRedirect(options)}>Log In</Button>;
};
