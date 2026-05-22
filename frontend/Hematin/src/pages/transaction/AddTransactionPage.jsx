import { useState } from "react";

import TransactionForm
from "../../components/transaction/TransactionForm";

const AddTransactionPage = () => {

  const [formData, setFormData] =
    useState({
      transactionType: "Expense",
      amount: "",
      description: "",
      transactionDate: "",
      wallet: "",
      category: "",
    });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleTypeChange = (type) => {

    setFormData({
      ...formData,
      transactionType: type,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const payload = {
      ...formData,
      source: "Manual",
    };

    console.log(payload);

    alert("Transaction Saved!");

  };

  return (
    <div className="page-container">

      <TransactionForm
        formData={formData}
        handleChange={handleChange}
        handleTypeChange={handleTypeChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default AddTransactionPage;