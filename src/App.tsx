import { useAuth0 } from "@auth0/auth0-react";
import { DefaultLayout } from "components/layout/DefaultLayout";
import { Login } from "pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "pages/Register";
import { Home } from "pages/Home";
import { NotFound } from "pages/NotFound";
import { AuthContextProvider } from "contexts/AuthContext";
import { Books } from "pages/Books";
import { MobileContextProvider } from "contexts/MobileContext";
import { SpinnerComponent } from "components/SpinnerComponent";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { setFillHeight } from "functions/utils";

export const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const setFillHeightFucntion = useCallback(setFillHeight, []);
  window.addEventListener("resize", setFillHeightFucntion);
  setFillHeightFucntion();

  if (isLoading) {
    return (
      <Box h="100vh" minHeight="calc(var(--vh, 1vh))">
        <SpinnerComponent size="lg" />
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <AuthContextProvider>
        <MobileContextProvider>
          <DefaultLayout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<Books />} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/login" element={<Navigate to="/home" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DefaultLayout>
        </MobileContextProvider>
      </AuthContextProvider>
    );
  } else {
    return (
      <MobileContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </MobileContextProvider>
    );
  }
};
