import { Routes, Route, Navigate } from "react-router-dom";
import StampPage from "./pages/StampPage";

const App = () => {
  return (
    <Routes>
      <Route path="/stamp" element={<StampPage />} />
      <Route path="*" element={<Navigate to="/stamp" />} />
    </Routes>
  );
};

export default App;