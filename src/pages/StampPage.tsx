import StampIssueCard from "../components/StampIssueCard";
import StampHistoryList from "../components/StampHistoryList";
import "../styles/stamp.css";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import { useEffect, useState } from "react";
import StampTourSelect from "@/components/StampTourSelect";

const StampPage = () => {
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState<number | null>(null);
  const [storeNm, setStoreNm] = useState("");
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiClient.get("/api/auth/stamp/session-check", {
          withCredentials: true,
        });

        const { storeId, storeNm } = res.data;
        setStoreId(storeId);
        setStoreNm(storeNm);
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
        <h2 className="store-name">{storeNm || "-"}</h2>
        <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
      </div>
      <div className="stamp-container">
        {/* 투어 선택 박스 */}
        <StampTourSelect
          storeId={storeId}
          selectedTourId={selectedTourId}
          setSelectedTourId={setSelectedTourId}
        />
        <StampIssueCard />
        <StampHistoryList />
      </div>
    </div>
  );
};

export default StampPage;
