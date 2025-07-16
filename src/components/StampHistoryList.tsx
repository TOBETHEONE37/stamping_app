interface TodayStampRecord {
  name: string;
  createdAt: string; // ISO date string
  stampCount: number;
}

interface Props {
  records: TodayStampRecord[];
}

const StampHistoryList = ({ records }: Props) => {
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
      <h3 className="card-title">오늘 발급 내역</h3>
      <ul className="history-list">
        {records.map((record, idx) => (
          <li key={idx}>
            <span>{record.name}</span>
            <span>{formatTime(record.createdAt)}</span>
            {/* <span className="count">+{record.stampCount}</span> */}
          </li>
        ))}
        {records.length === 0 && <li>발급된 스탬프가 없습니다.</li>}
      </ul>
    </div>
  );
};

export default StampHistoryList;
