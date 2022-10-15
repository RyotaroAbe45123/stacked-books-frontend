import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
import { theme } from "theme/theme";
import { words } from "utils/words";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const domain = process.env.REACT_APP_DOMAIN ?? "";
  const options = {
    redirect_uri: window.location.origin,
    audience: `https://${domain}/api/v2/`,
  };
  return (
    <Button
      onClick={() => loginWithRedirect(options)}
      bg={theme.mainColor}
      borderWidth="2px"
      borderRadius="30px 30px"
      borderColor={theme.titleText}
      w="200px"
      h="50px"
    >
      {words.login.loginButton}
    </Button>
  );
};
