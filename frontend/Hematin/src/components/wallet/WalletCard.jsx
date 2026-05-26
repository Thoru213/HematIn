const TYPE_ICON = {
  Cash: "💵",
  Bank: "🏦",
  "E-Wallet": "📱",
  "Credit Card": "💳",
  Investment: "📈",
  Other: "🪙",
};

const WalletCard = ({ wallet, onEdit, onDelete }) => {

  return (
    <div className="wallet-card">

      {/* ICON & NAME */}
      <div className="wallet-card-header">

        <span className="wallet-card-icon">
          {TYPE_ICON[wallet.wallet_type] ?? "🪙"}
        </span>

        <div>

          <p className="wallet-card-name">
            {wallet.wallet_name}
          </p>

          <p className="wallet-card-type">
            {wallet.wallet_type}
          </p>

        </div>

      </div>

      {/* BALANCE */}
      <p className="wallet-card-balance">
        Rp {Number(wallet.balance).toLocaleString("id-ID")}
      </p>

      {/* ACTIONS */}
      <div className="table-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(wallet)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(wallet.id_wallet)}
        >
          Delete
        </button>

      </div>

    </div>
  );

};

export default WalletCard;
