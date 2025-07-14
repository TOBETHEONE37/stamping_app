const StampIssueCard = () => {
  return (
    <div className="card">
      <h2 className="card-title">스탬프 발급</h2>
      <div className="input-row">
        <input type="text" placeholder="휴대폰 뒷번호 4자리 입력" />
        <button>🔍</button>
      </div>

      <div className="user-row">
        <div className="user-info">
          <div className="avatar" />
          <div className="user-text">
            <strong>김**님</strong>
            <span>최근 방문: 2025-06-20</span>
          </div>
        </div>
        <div className="issue-status">오늘 발급 가능</div>
      </div>

      <div className="progress-row">
        <div className="progress-label">성심당 스탬프: <b>3 / 5</b></div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "60%" }} />
        </div>
        <div className="progress-tip">5개 적립 시 무료 빵 교환</div>
      </div>

      <div className="btn-group">
        <button className="btn primary">+1 스탬프</button>
        <button className="btn outline">+2 스탬프</button>
      </div>
    </div>
  );
};

export default StampIssueCard;
