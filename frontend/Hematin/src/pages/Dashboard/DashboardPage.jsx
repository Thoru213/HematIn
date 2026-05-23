import { useState } from "react";

import GreetingHeader
from "../../components/dashboard/GreetingHeader";

import DashboardActions
from "../../components/dashboard/sections/DashboardActions";

import StatsSection
from "../../components/dashboard/sections/StatsSection";

import AnalyticsSection
from "../../components/dashboard/sections/AnalyticsSection";

import BottomSection
from "../../components/dashboard/sections/BottomSection";

const DashboardPage = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* =========================
     TRANSACTION STATE
  ========================= */

  const [transactions,
  setTransactions] =
    useState([]);

  return (
    <div className="dashboard-page">

      {/* =========================
          TOP SECTION
      ========================= */}

      <div className="dashboard-top">

        <GreetingHeader
          user={user}
        />

        <DashboardActions
          transactions={transactions}
          setTransactions={
            setTransactions
          }
        />

      </div>

      {/* =========================
          STATS
      ========================= */}

      <StatsSection
        transactions={transactions}
      />

      {/* =========================
          ANALYTICS
      ========================= */}

      <AnalyticsSection
        transactions={transactions}
      />

      {/* =========================
          BOTTOM SECTION
      ========================= */}

      <BottomSection
        transactions={transactions}
      />

    </div>
  );
};

export default DashboardPage;