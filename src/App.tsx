import { useAuth0 } from "@auth0/auth0-react";
import { DefaultLayout } from "components/layout/DefaultLayout";
import { Login } from "pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "pages/Register";
import { Home } from "pages/Home";
import { NotFound } from "pages/NotFound";
import { AuthContextProvider } from "contexts/AuthContext";

export const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Login isLoading={isLoading} />;
  }

  if (isAuthenticated) {
    return (
      <AuthContextProvider>
        <DefaultLayout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DefaultLayout>
      </AuthContextProvider>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login isLoading={isLoading} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
};
