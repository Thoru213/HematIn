const TransactionTypeToggle = ({
  value,
  onChange
}) => {

  return (

    <div className="transaction-toggle">

      <button
        type="button"
        className={
          value === "Pengeluaran"
            ? "toggle-btn active-expense"
            : "toggle-btn"
        }
        onClick={() =>
          onChange("Pengeluaran")
        }
      >
        Pengeluaran
      </button>

      <button
        type="button"
        className={
          value === "Pemasukan"
            ? "toggle-btn active-income"
            : "toggle-btn"
        }
        onClick={() =>
          onChange("Pemasukan")
        }
      >
        Pemasukan
      </button>

    </div>

  );

};

export default TransactionTypeToggle;