import StampIssueCard from "../components/StampIssueCard";
import StampHistoryList from "../components/StampHistoryList";
import "../styles/stamp.css";

const StampPage = () => {
  return (
    <div className="stamp-page">
      <div className="stamp-container">
        <StampIssueCard />
        <StampHistoryList />
      </div>
    </div>
  );
};

export default StampPage;
