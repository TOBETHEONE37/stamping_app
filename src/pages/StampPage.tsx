import StampIssueCard from "../components/StampIssueCard";
import StampHistoryList from "../components/StampHistoryList";
import "../styles/stamp.css";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import { useEffect, useState } from "react";
import StampTourSelect from "@/components/StampTourSelect";
import { decodeToken } from "@/utils/jwt";
import { IoLockClosedOutline, IoLogOutOutline } from "react-icons/io5";

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
    const init = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded || !decoded.storeId || !decoded.storeNm) {
        navigate("/login");
        return;
      }

      setStoreId(decoded.storeId);
      setStoreNm(decoded.storeNm);

      try {
        await fetchStampHistory(decoded.storeId);
      } catch (e) {
        console.error("초기 발급내역 조회 실패", e);
      } finally {
        setIsCheckingSession(false);
      }
    };

    init();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
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
        <div className="header-actions">
          <button className="icon-btn" title="비밀번호 변경" onClick={() => navigate("/password")}>
            <IoLockClosedOutline size={22} />
          </button>
          <button className="icon-btn" title="로그아웃" onClick={handleLogout}>
            <IoLogOutOutline size={22} />
          </button>
        </div>
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
          storeId={storeId}
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