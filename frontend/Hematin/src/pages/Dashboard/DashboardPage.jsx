import {
  useState,
  useEffect
} from "react";

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

import {
  getTransactions
} from "../../services/transactionService";

const DashboardPage = () => {

  /* =========================
     USER
  ========================= */

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* =========================
     TRANSACTION STATE
  ========================= */

  const [
    transactions,
    setTransactions
  ] = useState([]);

  /* =========================
     FETCH TRANSACTIONS
  ========================= */

  useEffect(() => {

    const fetchTransactions =
      async () => {

        try {

          if (!user?.id_user)
            return;

          const data =
            await getTransactions(
              user.id_user
            );

          setTransactions(data);

        } catch (error) {

          console.log(error);

        }

      };

    fetchTransactions();

  }, [user?.id_user]);

  /* =========================
     LATEST 5 TRANSACTIONS
  ========================= */

  const latestTransactions =
    transactions.slice(0,5);

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
        transactions={
          latestTransactions
        }
      />

    </div>

  );

};

export default DashboardPage;