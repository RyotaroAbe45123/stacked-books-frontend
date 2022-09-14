import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated ? (
    <Button onClick={loginWithRedirect}>Log in</Button>
  ) : null;
};

export default LoginButton;
