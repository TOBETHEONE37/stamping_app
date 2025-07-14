import apiClient from "@/api/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginPage = () => {
  const [bizNo, setBizNo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (bizNo.length < 10) {
      setError("사업자번호를 정확히 입력하세요.");
      return;
    }

    try {
        setLoading(true);
        await apiClient.post("/api/auth/stamp/login", {
            businessNumber: bizNo,
        }, {
            withCredentials: true,
        });
        navigate("/stamp");
    } catch (err) {
        setError("존재하지 않는 사업자번호입니다.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>관리자 로그인</h1>
        <p>사업자번호로 인증하세요</p>
        <input
          type="text"
          placeholder="사업자번호 10자리"
          value={bizNo}
          onChange={(e) => setBizNo(e.target.value)}
          maxLength={10}
        />
        {error && <div className="error-text">{error}</div>}
        <button onClick={handleLogin} disabled={loading || bizNo.length < 10}>
          {loading ? "확인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
