import { useState } from "react";

import Modal from "../../ui/Modal";

import TransactionForm
from "../../transaction/TransactionForm";

import BudgetForm
from "../../budget/BudgetForm";

const DashboardActions = () => {

  /* =========================
     MODAL STATE
  ========================= */

  const [showTransaction, setShowTransaction] =
    useState(false);

  const [showBudget, setShowBudget] =
    useState(false);

  const [showReceipt, setShowReceipt] =
    useState(false);

  /* =========================
     RECEIPT STATE
  ========================= */

  const [receiptImage, setReceiptImage] =
    useState(null);

  /* =========================
     TRANSACTION STATE
  ========================= */

  const [transactionData, setTransactionData] =
    useState({
      transactionType: "Expense",
      amount: "",
      description: "",
      transactionDate: "",
      wallet: "",
      category: "",
    });

  /* =========================
     BUDGET STATE
  ========================= */

  const [budgetData, setBudgetData] =
    useState({
      budgetType: "Expense",
      descriptionBudget: "",
      category: "",
      amountLimit: "",
      startDate: "",
      endDate: "",
    });

  /* =========================
     TRANSACTION HANDLER
  ========================= */

  const handleTransactionChange = (e) => {

    const { name, value } = e.target;

    setTransactionData({
      ...transactionData,
      [name]: value,
    });

  };

  const handleTypeChange = (type) => {

    setTransactionData({
      ...transactionData,
      transactionType: type,
    });

  };

  const handleTransactionSubmit = (e) => {

    e.preventDefault();

    const payload = {
      ...transactionData,
      source: "Manual",
    };

    console.log(payload);

    alert("Transaction Saved!");

    setShowTransaction(false);

  };

  /* =========================
     BUDGET HANDLER
  ========================= */

  const handleBudgetChange = (e) => {

    const { name, value } = e.target;

    setBudgetData({
      ...budgetData,
      [name]: value,
    });

  };

  const handleBudgetTypeChange = (type) => {

    setBudgetData({
      ...budgetData,
      budgetType: type,
    });

  };

  const handleBudgetSubmit = (e) => {

    e.preventDefault();

    console.log(budgetData);

    alert("Budget Saved!");

    setShowBudget(false);

  };

  /* =========================
     RECEIPT HANDLER
  ========================= */

  const handleReceiptUpload = (e) => {

    const file = e.target.files[0];

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
    <>

      {/* =========================
          ACTION BUTTON
      ========================= */}

      <div className="dashboard-actions">

        <button
          onClick={() =>
            setShowTransaction(true)
          }
        >
          + Tambah Transaksi
        </button>

        <button
          className="scan-btn"
          onClick={() =>
            setShowReceipt(true)
          }
        >
          📷 Scan Struk
        </button>

        <button
          onClick={() =>
            setShowBudget(true)
          }
        >
          + Tambah Budget
        </button>

      </div>

      {/* =========================
          TRANSACTION MODAL
      ========================= */}

      <Modal
        show={showTransaction}
        onClose={() =>
          setShowTransaction(false)
        }
      >

        <TransactionForm
          formData={transactionData}
          handleChange={
            handleTransactionChange
          }
          handleTypeChange={
            handleTypeChange
          }
          handleSubmit={
            handleTransactionSubmit
          }
        />

      </Modal>

      {/* =========================
          BUDGET MODAL
      ========================= */}

      <Modal
        show={showBudget}
        onClose={() =>
          setShowBudget(false)
        }
      >

        <BudgetForm
          formData={budgetData}
          handleChange={
            handleBudgetChange
          }
          handleTypeChange={
            handleBudgetTypeChange
          }
          handleSubmit={
            handleBudgetSubmit
          }
        />

      </Modal>

      {/* =========================
          RECEIPT MODAL
      ========================= */}

      <Modal
        show={showReceipt}
        onClose={() => {

          setShowReceipt(false);

          setReceiptImage(null);

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
              onChange={handleReceiptUpload}
            />

            <div className="upload-content">

              {
                receiptImage && (
                  <div className="receipt-preview">

                    <img
                      src={receiptImage}
                      alt="Receipt Preview"
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

    </>
  );
};

export default DashboardActions;