import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
import { theme } from "theme/theme";
import { words } from "utils/words";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      bg={theme.mainColor}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      {words.header.logoutButton}
    </Button>
  );
};
