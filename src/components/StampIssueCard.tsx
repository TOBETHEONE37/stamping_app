import apiClient from "@/api/client";
import { useState } from "react";
import AlertModal from "./AlertModal";

interface StampIssueCardProps {
  stampRallyId: number | null;
  storeId: number | null;
  onIssueSuccess?: () => void;
}

interface User {
  userId: number;
  name: string;
  stampRallyId: number | null;
  storeInfoId: number | null;
}

const StampIssueCard = ({ stampRallyId, storeId, onIssueSuccess }: StampIssueCardProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const selectedUser = users.find((user) => user.userId === selectedUserId);

  const noTourSelected = stampRallyId === null;

  const handleSearch = async () => {
    if (!stampRallyId) return;
    if (!/^\d{4}$/.test(searchValue.trim())) return;

    setSearched(true);
    setLoading(true);
    setSelectedUserId(null);

    try {
      const res = await apiClient.get<User[]>("/api/user/stamp/byPhoneSuffix", {
        params: {
          lastFourDigits: searchValue.trim(),
          stampRallyId,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("회원 검색 실패", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueStamp = async () => {
    if (!stampRallyId || !selectedUser || !storeId) return;

    setIsIssuing(true);

    try {
      await apiClient.post("/api/stamp/rally/user", {
        stampRallyId,
        userId: selectedUser.userId,
        storeId,
      });

      setShowModal(true);
      handleSearch();
      onIssueSuccess?.();
    } catch (err) {
      console.error("스탬프 발급 실패", err);
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">스탬프 발급</h2>

      <div className="input-row">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          placeholder="휴대폰 뒷번호 4자리 입력"
          value={searchValue}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // 숫자만 허용
            setSearchValue(value);
          }}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <div className="user-select-list">
        {noTourSelected && (
          <div className="placeholder">투어를 선택해주세요</div>
        )}

        {!noTourSelected && !searched && !loading && (
          <div className="placeholder">휴대폰 번호를 입력해주세요</div>
        )}

        {!noTourSelected && loading && (
          <div className="loading-box">
            <div className="spinner" />
          </div>
        )}

        {!noTourSelected && searched && !loading && users.length === 0 && (
          <div className="placeholder">일치하는 회원이 없습니다</div>
        )}

        {!noTourSelected && searched && !loading && users.length > 0 && (
          users.map((user) => {
            const isSelected = selectedUserId === user.userId;
            const hasStamped = user.storeInfoId === storeId;

            return (
              <label key={user.userId} className="user-select-item">
                <input
                  type="radio"
                  name="selectedUser"
                  value={user.userId}
                  checked={isSelected}
                  onChange={() => setSelectedUserId(user.userId)}
                />
                <div className="user-info">
                  <div className="user-text">
                    <strong>{user.name} 님</strong>
                    <span className={`stamp-status ${hasStamped ? "stamped" : "available"}`}>
                      {hasStamped ? "스탬프 발급 완료" : "스탬프 발급 가능"}
                    </span>
                  </div>
                </div>
              </label>
            );
          })
        )}
      </div>

      {!loading && !noTourSelected && searched && (
        <div className="btn-group">
          <button
            className="btn primary"
            disabled={!selectedUser || selectedUser.storeInfoId === storeId || isIssuing}
            onClick={handleIssueStamp}
          >
            {isIssuing ? (
                <div className="spinner" style={{ width: 18, height: 18 }} />
              ) : (
                "+1 스탬프"
              )
            }
          </button>
        </div>
      )}

      <AlertModal
        isOpen={showModal}
        message="스탬프가 발급되었습니다."
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default StampIssueCard;
