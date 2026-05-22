import TransactionTypeToggle from "./TransactionTypeToggle";
import "../../dist/css/Transaction.css";

const TransactionForm = ({
  formData,
  handleChange,
  handleTypeChange,
  handleSubmit,
}) => {
  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Tambah Transaction</h2>

      <div className="form-group">
        <label>Transaction Type</label>

        <TransactionTypeToggle
          value={formData.transactionType}
          onChange={handleTypeChange}
        />
      </div>

      <div className="form-group">
        <label>Amount</label>

        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Transaction Date</label>

        <input
          type="datetime-local"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">

  <label>Wallet</label>

  <select
    name="wallet"
    value={formData.wallet}
    onChange={handleChange}
  >

    <option value="">
      Select Wallet
    </option>

    <option value="cash">
      Cash
    </option>

    <option value="gopay">
      GoPay
    </option>

  </select>

</div>

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

  <option value="Food">
    Food
  </option>

  <option value="Transport">
    Transport
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Salary">
    Salary
  </option>

  <option value="Freelance">
    Freelance
  </option>

</select>

</div>

      <button type="submit" className="submit-btn">
        Save Transaction
      </button>
    </form>
  );
};

export default TransactionForm;