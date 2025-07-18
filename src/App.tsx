import { Routes, Route, Navigate } from "react-router-dom";
import StampPage from "./pages/StampPage";
import LoginPage from "./pages/LoginPage";
import PasswordPage from "./pages/PasswordPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/stamp" element={<StampPage />} />
      <Route path="/password" element={<PasswordPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;