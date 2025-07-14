import StampIssueCard from "../components/StampIssueCard";
import StampHistoryList from "../components/StampHistoryList";
import "../styles/stamp.css";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import { useEffect, useState } from "react";

const StampPage = () => {
  const navigate = useNavigate();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiClient.get("/api/auth/stamp/session-check", {
          withCredentials: true,
        });
        setIsCheckingSession(false);
      } catch (err) {
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  if (isCheckingSession) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/auth/stamp/logout", null, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  return (
    <div className="stamp-page">
      <div className="stamp-header">
        <h2 className="store-name">성심당</h2>
        <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
      </div>
      <div className="stamp-container">
        <StampIssueCard />
        <StampHistoryList />
      </div>
    </div>
  );
};

export default StampPage;
