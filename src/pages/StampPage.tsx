import StampIssueCard from "../components/StampIssueCard";
import StampHistoryList from "../components/StampHistoryList";
import "../styles/stamp.css";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import { useEffect, useState } from "react";
import StampTourSelect from "@/components/StampTourSelect";

export interface TodayStampRecord {
  name: string;
  createdAt: string;
  stampCount: number;
}

const StampPage = () => {
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState<number | null>(null);
  const [storeNm, setStoreNm] = useState("");
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const [records, setRecords] = useState<TodayStampRecord[]>([]); // 발급 내역

  useEffect(() => {

    const checkSession = async () => {
      try {
        const res = await apiClient.get("/api/auth/stamp/session-check");

        const { storeId, storeNm } = res.data;
        setStoreId(storeId);
        setStoreNm(storeNm);
        setIsCheckingSession(false);

        fetchStampHistory(storeId);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Session check failed:", err.message);
        }
        navigate("/login");
      }
    };

    // login check
    checkSession();

  }, [navigate]);

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/auth/stamp/logout", null);
      navigate("/login");
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  const fetchStampHistory = async (storeId: number) => {
    try {
      const res = await apiClient.get<TodayStampRecord[]>(
        `/api/stamp/rally/user/today?storeId=${storeId}`
      );
      setRecords(res.data);
    } catch (err) {
      console.error("발급 내역 조회 실패", err);
    }
  };

  // avoid flickering
  if (isCheckingSession) return null;

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
        {/* 검색 및 스탬프 발급 */}
        <StampIssueCard
          stampRallyId={selectedTourId}
          onIssueSuccess={() => {
            if (storeId) fetchStampHistory(storeId); // ← 여기서 재조회!
          }}
        />
        {/* 발급 내역 */}
        <StampHistoryList records={records} />
      </div>
    </div>
  );
};

export default StampPage;