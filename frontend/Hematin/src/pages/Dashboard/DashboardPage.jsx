import GreetingHeader from "../../components/dashboard/GreetingHeader";

import DashboardActions from "../../components/dashboard/sections/DashboardActions";
import StatsSection from "../../components/dashboard/sections/StatsSection";
import AnalyticsSection from "../../components/dashboard/sections/AnalyticsSection";
import BottomSection from "../../components/dashboard/sections/BottomSection";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
      <div className="dashboard-page">
        <div className="dashboard-top">
          <GreetingHeader user={user} />

          <DashboardActions />
        </div>

        {/* Stats Cards */}
        <StatsSection />

        {/* Chart & Budget */}
        <AnalyticsSection />

        {/* Transactions & Tips */}
        <BottomSection />

      </div>
  );
};

export default DashboardPage;