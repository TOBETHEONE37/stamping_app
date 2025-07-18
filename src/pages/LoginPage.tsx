import apiClient from "@/api/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { decodeToken } from "@/utils/jwt";

const LoginPage = () => {
  const [bizNo, setBizNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const handleLogin = async () => {
    if (bizNo.length < 10) {
      setError("사업자번호를 정확히 입력하세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await apiClient.post("/api/auth/stamp/login", {
        businessNumber: bizNo,
        password: password,
      });

      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = decodeToken(accessToken);
      if (!decoded) throw new Error("토큰 디코딩 실패");

      // → storeId / storeNm 넘김
      navigate("/stamp", {
        state: {
          storeId: decoded.storeId,
          storeNm: decoded.storeNm,
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err.message);
      }
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
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
