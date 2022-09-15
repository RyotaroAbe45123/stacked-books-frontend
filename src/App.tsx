import { useAuth0 } from "@auth0/auth0-react";
import { DefaultLayout } from "components/layout/DefaultLayout";
import { Input } from "pages/Input";
import { Login } from "pages/Login";
import { Main } from "pages/Main";
import { Profile } from "Profile";
import { Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated);

  if (isLoading) {
    return <></>;
  }

  if (isAuthenticated) {
    return (
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/input" element={<Input />} />
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
