import "../../dist/css/Transaction.css";

const TransactionTable = ({
  transactions
}) => {

  return (
    <table className="transaction-table">

      <thead>

        <tr>

          <th>No</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Wallet</th>
          <th>Date</th>

        </tr>

      </thead>

      <tbody>

        {
          transactions.length === 0
          ? (
            <tr>

              <td
                colSpan="5"
                className="empty-table"
              >
                Belum ada transaksi
              </td>

            </tr>
          )
          : (
            transactions.map(
              (item, index) => (

              <tr key={index}>

                <td>{index + 1}</td>

                <td>
                  {item.transaction_type}
                </td>

                <td>
                  {item.category_name}
                </td>

                <td>
                  Rp {item.amount}
                </td>

                <td>
                  {item.wallet_name}
                </td>

                <td>
                  {item.transaction_date}
                </td>

              </tr>

            ))
          )
        }

      </tbody>

    </table>
  );
};

export default TransactionTable;