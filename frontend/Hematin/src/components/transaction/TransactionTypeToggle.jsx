const TransactionTypeToggle = ({ value, onChange }) => {
  return (
    <div className="transaction-toggle">
      <button
        type="button"
        className={
          value === "Expense"
            ? "toggle-btn active-expense"
            : "toggle-btn"
        }
        onClick={() => onChange("Expense")}
      >
        Expense
      </button>

      <button
        type="button"
        className={
          value === "Income"
            ? "toggle-btn active-income"
            : "toggle-btn"
        }
        onClick={() => onChange("Income")}
      >
        Income
      </button>
    </div>
  );
};

export default TransactionTypeToggle;