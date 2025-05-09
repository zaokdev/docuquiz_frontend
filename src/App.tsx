import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CreatePage from "./pages/create";
import AnswerPage from "./pages/answer";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AnswerPage />} path="/answer" />
    </Routes>
  );
}

export default App;
