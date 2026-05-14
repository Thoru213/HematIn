const Modal = ({
  show,
  onClose,
  title,
  children,
}) => {

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">

      <div className="custom-modal">

        <div className="modal-header">

          <h4>{title}</h4>

          <button onClick={onClose}>
            ✖
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Modal;