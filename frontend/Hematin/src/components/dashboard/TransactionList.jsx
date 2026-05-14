import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  return (
    <div className="transaction-list-card">

      <div className="transaction-header">
        <h4>Transaksi Terakhir</h4>
      </div>

      <TransactionItem
        title="Nasi Goreng"
        date="Hari ini"
        amount="25.000"
        type="expense"
      />

      <TransactionItem
        title="Top Up E-Wallet"
        date="Hari ini"
        amount="100.000"
        type="income"
      />

    </div>
  );
};

export default TransactionList;