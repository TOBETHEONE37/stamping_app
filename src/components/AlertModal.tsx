import "../styles/alertModal.css"

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const AlertModal = ({ isOpen, message, onClose }: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-message">{message}</p>
        <button className="modal-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
