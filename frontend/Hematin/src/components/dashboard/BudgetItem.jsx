const BudgetItem = ({
  title,
  used,
  limit,
  percent,
}) => {
  return (
    <div className="budget-item">

      <div className="budget-info">
        <h6>{title}</h6>

        <span>{percent}%</span>
      </div>

      <div className="budget-bar">
        <div
          className="budget-progress"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p>
        Terpakai Rp {used} dari Rp {limit}
      </p>

    </div>
  );
};

export default BudgetItem;