import { useAuth0 } from "@auth0/auth0-react";
import { Box, Spinner } from "@chakra-ui/react";
import { DefaultLayout } from "components/layout/DefaultLayout";
import { InputPerformance } from "pages/Input";
import { Login } from "pages/Login";
import { Main } from "pages/Main";
import { Profile } from "Profile";
import { Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="20%"
      >
        <Box>
          <Spinner size="lg" thickness="5px" />
        </Box>
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/input" element={<InputPerformance />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </DefaultLayout>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
};
