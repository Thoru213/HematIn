import TransactionList from "../TransactionList";
import FinanceTipsCard from "../FinanceTipsCard";

const BottomSection = () => {
  return (
    <div className="bottom-section">

      <TransactionList />

      <FinanceTipsCard />

    </div>
  );
};

export default BottomSection;