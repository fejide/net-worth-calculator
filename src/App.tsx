import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NetWorthPage from "./pages/NetWorthPage";
import BudgetPage from "./pages/BudgetPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/net-worth" element={<NetWorthPage />} />
      <Route path="/budget" element={<BudgetPage />} />
    </Routes>
  );
}

export default App;