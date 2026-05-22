import TransactionTypeToggle
from "../transaction/TransactionTypeToggle";

import "../../dist/css/Transaction.css";

const BudgetForm = ({
  formData,
  handleChange,
  handleTypeChange,
  handleSubmit,
}) => {

  return (
    <form
      className="budget-form"
      onSubmit={handleSubmit}
    >

      <h2 className="form-title">
        Add Budget
      </h2>

      {/* TYPE */}

      <div className="form-group">

        <label>Budget Type</label>

        <TransactionTypeToggle
          value={formData.budgetType}
          onChange={handleTypeChange}
        />

      </div>

      {/* TITLE */}

      <div className="form-group">

        <label>Budget Title</label>

        <input
          type="text"
          name="descriptionBudget"
          placeholder="Enter budget title"
          value={formData.descriptionBudget}
          onChange={handleChange}
        />

      </div>

      {/* CATEGORY */}

      <div className="form-group">

        <label>Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >

          <option value="">
            Select Category
          </option>

          {
            formData.budgetType ===
            "Expense"
            ? (
              <>
                <option value="Food">
                  Food
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Shopping">
                  Shopping
                </option>
              </>
            )
            : (
              <>
                <option value="Salary">
                  Salary
                </option>

                <option value="Freelance">
                  Freelance
                </option>

                <option value="Bonus">
                  Bonus
                </option>
              </>
            )
          }

        </select>

      </div>

      {/* LIMIT */}

      <div className="form-group">

        <label>Amount Limit</label>

        <input
          type="number"
          name="amountLimit"
          placeholder="Enter amount limit"
          value={formData.amountLimit}
          onChange={handleChange}
        />

      </div>

      {/* START DATE */}

      <div className="form-group">

        <label>Start Date</label>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

      </div>

      {/* END DATE */}

      <div className="form-group">

        <label>End Date</label>

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        className="submit-btn"
      >
        Save Budget
      </button>

    </form>
  );
};

export default BudgetForm;