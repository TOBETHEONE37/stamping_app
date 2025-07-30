import type { TodayStampRecord } from "@/pages/StampPage";

interface Props {
  records: TodayStampRecord[];
  selectedDate: string;
  onChangeDate: (date: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const StampHistoryList = ({ 
  records,
  selectedDate,
  onChangeDate,
  onSearch,
  loading,
}: Props) => {
  const formatTime = (isoTime: string) => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="card">
      <h3 className="card-title">발급 내역</h3>
      <div className="input-row" style={{ marginBottom: "1rem" }}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onChangeDate(e.target.value)}
        />
        <button onClick={onSearch}>조회</button>
      </div>
      <ul className="history-list">
        {loading ? (
          <div className="loading-box">
            <div className="spinner" />
          </div>
        ) : records.length > 0 ? (
          records.map((record, idx) => (
            <li key={idx}>
              <span className="user-text">
                <strong>{record.name}</strong>
                <span className="rally-name">{record.stampRallyName}</span>
              </span>
              <span className="time">{formatTime(record.createdAt)}</span>
            </li>
          ))
        ) : (
          <li className="placeholder">발급된 스탬프가 없습니다</li>
        )}
      </ul>
    </div>
  );
};

export default StampHistoryList;
