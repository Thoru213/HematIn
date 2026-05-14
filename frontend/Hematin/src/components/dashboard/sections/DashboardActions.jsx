import { useState } from "react";

import Modal from "../../ui/Modal";

const DashboardActions = () => {

  const [showTransaction, setShowTransaction] =
    useState(false);

  const [showBudget, setShowBudget] =
    useState(false);

  return (
    <>

      <div className="dashboard-actions">

        <button
          onClick={() =>
            setShowTransaction(true)
          }
        >
          + Tambah Transaksi
        </button>

        <button
          onClick={() =>
            setShowBudget(true)
          }
        >
          + Tambah Budget
        </button>

      </div>

      {/* TRANSACTION MODAL */}

      <Modal
        show={showTransaction}
        onClose={() =>
          setShowTransaction(false)
        }
        title="Tambah Transaksi"
      >

        <p>
          Form transaksi nanti di sini
        </p>

      </Modal>

      {/* BUDGET MODAL */}

      <Modal
        show={showBudget}
        onClose={() =>
          setShowBudget(false)
        }
        title="Tambah Budget"
      >

        <p>
          Form budget nanti di sini
        </p>

      </Modal>

    </>
  );
};

export default DashboardActions;