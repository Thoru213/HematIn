import { useState } from "react";

import BudgetForm
from "../../components/budget/BudgetForm";

const AddBudgetPage = () => {

  const [formData, setFormData] =
    useState({
      budgetType: "Expense",
      descriptionBudget: "",
      category: "",
      amountLimit: "",
      startDate: "",
      endDate: "",
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
      budgetType: type,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    alert("Budget Saved!");

  };

  return (
    <div className="page-container">

      <BudgetForm
        formData={formData}
        handleChange={handleChange}
        handleTypeChange={handleTypeChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default AddBudgetPage;