import { useState } from "react";

import Modal from "../ui/Modal";

const ReceiptModal = ({
  show,
  onClose,
}) => {

  const [receiptImage,
  setReceiptImage] =
    useState(null);

  const handleReceiptUpload =
  (e) => {

    const file =
      e.target.files[0];

    if (file) {

      setReceiptImage(
        URL.createObjectURL(file)
      );

    }

  };

  const handleDrop = (e) => {

    e.preventDefault();

    const file =
      e.dataTransfer.files[0];

    if (file) {

      setReceiptImage(
        URL.createObjectURL(file)
      );

    }

  };

  const handleDragOver = (e) => {

    e.preventDefault();

  };

  return (
    <Modal
      show={show}
      onClose={() => {

        setReceiptImage(null);

        onClose();

      }}
    >

      <div className="receipt-upload">

        <h3>
          Upload Struk Anda
        </h3>

        <p>
          Upload gambar struk transaksi.
        </p>

        <label
          className="custom-file-upload"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={
              handleReceiptUpload
            }
          />

          <div className="upload-content">

            {
              receiptImage && (
                <div className="receipt-preview">

                  <img
                    src={receiptImage}
                    alt="preview"
                  />

                </div>
              )
            }

            <div className="upload-icon">
              📷
            </div>

            <h4>
              Pilih atau Drop File
            </h4>

            <p>
              JPG, PNG • Maksimal 10 MB
            </p>

          </div>

        </label>

        <button className="upload-btn">
          Scan Sekarang
        </button>

      </div>

    </Modal>
  );
};

export default ReceiptModal;