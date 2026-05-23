import { useState } from "react";

import Modal from "../../components/ui/Modal";

import TransactionForm
from "../../components/transaction/TransactionForm";

import TransactionTable
from "../../components/transaction/TransactionTable";

import ReceiptModal
from "../../components/receipt/ReceiptModal";

import {
  addTransaction
} from "../../services/transactionService";

const TransactionPage = () => {

  /* =========================
     MODAL STATE
  ========================= */

  const [showTransaction,
    setShowTransaction] =
    useState(false);

  const [showReceipt,
    setShowReceipt] =
    useState(false);

  /* =========================
     TRANSACTION TABLE STATE
  ========================= */

  const [transactions,
    setTransactions] =
    useState([]);

  const [typeFilter,
    setTypeFilter] =
    useState("All");

  const [sourceFilter,
    setSourceFilter] =
    useState("All");

  const [search,
    setSearch] =
    useState("");

  /* =========================
     FORM STATE
  ========================= */

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData,
    setFormData] =
    useState({
      transactionType: "Pengeluaran",
      amount: "",
      description: "",
      transactionDate: "",
      wallet: "",
      category: "",
    });

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  /* =========================
     HANDLE TYPE
  ========================= */

  const handleTypeChange = (type) => {

    setFormData({
      ...formData,
      transactionType: type,
    });

  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const payload = {

          id_user:
            user.id_user,
        
          id_wallet:
            formData.wallet,
        
          id_category:
            formData.category,
        
          id_budget:
            null,
        
          transaction_type:
            formData.transactionType,
        
          amount:
            Number(formData.amount),
        
          description:
            formData.description,
        
          transaction_date:
            formData.transactionDate,
        
          source:
            "Manual"
        
        }

        console.log(payload);

        const result =
          await addTransaction(
            payload
          );

        console.log(result);

        setTransactions([
          ...transactions,
          {
            ...formData,
            source: "Manual",
          },
        ]);

        alert(
          "Transaction berhasil ditambahkan"
        );

        setShowTransaction(false);

        setFormData({
          transactionType:
            "Pengeluaran",
          amount: "",
          description: "",
          transactionDate: "",
          wallet: "",
          category: "",
        });

      } catch (error) {

        console.log(error);

        alert(
          "Gagal tambah transaction"
        );

      }

    };

  /* =========================
     FILTER DATA
  ========================= */

  const filteredTransactions =
    transactions.filter((item) => {

      const matchType =
        typeFilter === "All"
        || item.transactionType ===
        typeFilter;

      const matchSource =
        sourceFilter === "All"
        || item.source ===
        sourceFilter;

      const matchSearch =
        item.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchType
        && matchSource
        && matchSearch
      );

    });

  return (
    <div className="transaction-page">

      {/* HEADER */}

      <div className="transaction-header">

        <div>

          <h2>
            Transactions
          </h2>

          <p>
            Kelola transaksi keuangan
          </p>

        </div>

        {/* ACTION BUTTON */}

        <div className="transaction-actions">

          <button
            className="add-btn"
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

        </div>

      </div>

      {/* TOOLBAR */}

      <div className="transaction-toolbar">

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Cari transaksi..."
          className="transaction-search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* TYPE FILTER */}

        <select
          className="transaction-filter"
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >

          <option value="All">
            Semua Type
          </option>

          <option value="Pengeluaran">
            Pengeluaran
          </option>

          <option value="Pemasukan">
            Pemasukan
          </option>

        </select>

        {/* SOURCE FILTER */}

        <select
          className="transaction-filter"
          value={sourceFilter}
          onChange={(e) =>
            setSourceFilter(e.target.value)
          }
        >

          <option value="All">
            Semua Source
          </option>

          <option value="Manual">
            Manual
          </option>

          <option value="Scan">
            Scan
          </option>

        </select>

      </div>

      {/* TABLE */}

      <TransactionTable
        transactions={
          filteredTransactions
        }
      />

      {/* TRANSACTION MODAL */}

      <Modal
        show={showTransaction}
        onClose={() =>
          setShowTransaction(false)
        }
      >

        <TransactionForm
          formData={formData}
          handleChange={handleChange}
          handleTypeChange={
            handleTypeChange
          }
          handleSubmit={handleSubmit}
        />

      </Modal>

      {/* RECEIPT MODAL */}

      <ReceiptModal
        show={showReceipt}
        onClose={() =>
          setShowReceipt(false)
        }
      />

    </div>
  );

};

export default TransactionPage;