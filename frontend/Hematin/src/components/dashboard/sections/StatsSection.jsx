import StatCard from "../StatCard"

const StatsSection = () => {
  return (
    <div className="stats-section">

      <StatCard
        title="Total Saldo"
        amount="Rp 8.450.000"
        type="💰"
      />

      <StatCard
        title="Total Pemasukan"
        amount="Rp 5.200.000"
        type="📈"
      />

      <StatCard
        title="Total Pengeluaran"
        amount="Rp 3.250.000"
        type="📉"
      />

    </div>
  );
};

export default StatsSection;
