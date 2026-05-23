import TransactionItem
from "./TransactionItem";

const TransactionList = ({
  transactions = []
}) => {

  const latestTransactions =
    transactions.slice(-5).reverse();

  return (
    <div className="transaction-list-card">

      <div className="transaction-header">

        <h4>
          Transaksi Terakhir
        </h4>

      </div>

      {
        latestTransactions.length === 0
        ? (
          <p>
            Belum ada transaksi
          </p>
        )
        : (
          latestTransactions.map(
            (item, index) => (

            <TransactionItem
              key={index}
              title={item.description}
              date={
                item.transaction_date
              }
              amount={item.amount}
              type={
                item.transaction_type
                .toLowerCase()
              }
            />

          ))
        )
      }

    </div>
  );
};

export default TransactionList;