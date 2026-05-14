import { useState } from "react";

const NotificationButton = () => {

  const [showNotif, setShowNotif] =
    useState(false);

  return (
    <div className="notification-wrapper">

      <button
        className="notif-btn"
        onClick={() =>
          setShowNotif(!showNotif)
        }
      >
        🔔
      </button>

      {showNotif && (

        <div className="notification-dropdown">

          <div className="notification-header">

            <h5>Notifikasi</h5>

            <span>3 Baru</span>

          </div>

          <div className="notification-list">

            <div className="notification-item">

              <div className="notification-dot"></div>

              <div>

                <h6>
                  Transaksi berhasil
                </h6>

                <p>
                  Pengeluaran Rp50.000
                </p>

              </div>

            </div>

            <div className="notification-item">

              <div className="notification-dot warning"></div>

              <div>

                <h6>
                  Budget hampir habis
                </h6>

                <p>
                  Budget makanan 90%
                </p>

              </div>

            </div>

            <div className="notification-item">

              <div className="notification-dot success"></div>

              <div>

                <h6>
                  Pemasukan bertambah
                </h6>

                <p>
                  Gaji bulan ini masuk
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default NotificationButton;