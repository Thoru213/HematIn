import BudgetItem from "./BudgetItem";

const BudgetCard = () => {
  return (
    <div className="budget-card">

      <h4>Rencana Anggaran</h4>

      <BudgetItem
        title="Makanan"
        used="850.000"
        limit="1.200.000"
        percent={71}
      />

      <BudgetItem
        title="Transportasi"
        used="450.000"
        limit="500.000"
        percent={90}
      />

    </div>
  );
};

export default BudgetCard;