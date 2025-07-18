import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import "../styles/password.css";
import AlertModal from "@/components/AlertModal";

const PasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
      document.body.classList.add("no-scroll");
      return () => document.body.classList.remove("no-scroll");
  }, []);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      await apiClient.post(
        "/api/auth/stamp/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlertMessage("비밀번호가 변경되었습니다.");
      setShowAlert(true);
    } catch (err: any) {
      setAlertMessage("변경 실패: " + (err.response?.data?.message || "알 수 없는 오류"));
      setShowAlert(true);
    }
  };

  const handleModalClose = () => {
    setShowAlert(false);

    if (alertMessage.includes("비밀번호가 변경되었습니다")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  return (
    <div className="password-page">
        <div className="password-card">
          <h2>비밀번호 변경</h2>

          <input
              type="password"
              className="password-input"
              placeholder="현재 비밀번호"
              maxLength={16}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
              type="password"
              className="password-input"
              placeholder="새 비밀번호"
              maxLength={16}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
              type="password"
              className="password-input"
              placeholder="새 비밀번호 확인"
              maxLength={16}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="password-btn-group">
              <button className="password-btn outline" onClick={() => navigate(-1)}>
              취소
              </button>
              <button className="password-btn primary" onClick={handleChangePassword}>
              변경하기
              </button>
          </div>
        </div>
        <AlertModal
          isOpen={showAlert}
          message={alertMessage}
          onClose={handleModalClose}
        />
    </div>
    );
};

export default PasswordPage;
