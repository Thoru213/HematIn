const StatCard = ({
  title,
  amount,
  type,
}) => {

  return (
    <div className="stat-card">

      <div className="stat-top">
        <span>{type}</span>
      </div>

      <h5>{title}</h5>

      <h3>{amount}</h3>

    </div>
  );
};

export default StatCard;