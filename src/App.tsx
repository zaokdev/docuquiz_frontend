import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CreatePage from "./pages/create";
import AnswerPage from "./pages/answer";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AnswerPage />} path="/answer" />
      <Route element={<LoginPage />} path="/auth/login" />
      <Route element={<RegisterPage />} path="/auth/register" />
    </Routes>
  );
}

export default App;
