import { Dashboard } from "components/Dashboard";
import { DefaultLayout } from "components/layout/DefaultLayout";
import { Input } from "pages/Input";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/input" element={<Input />} />
      </Routes>
    </DefaultLayout>
  );
};
