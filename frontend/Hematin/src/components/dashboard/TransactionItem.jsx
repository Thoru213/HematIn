const TransactionItem = ({
  title,
  date,
  amount,
  type,
}) => {
  return (
    <div className="transaction-item">

      <div>
        <h6>{title}</h6>
        <p>{date}</p>
      </div>

      <h5>
        {type === "income" ? "+" : "-"}
        Rp {amount}
      </h5>

    </div>
  );
};

export default TransactionItem;