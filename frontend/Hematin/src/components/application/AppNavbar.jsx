import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";

import AppSidebar from "./AppSidebar";

import SearchBox from "./SearchBox";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";

const AppNavbar = () => {

  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSearch(false);
      }
    };
    window.addEventListener(
      "resize",
      handleResize
    );
    
    return () => {
      
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <>
      <header className="app-navbar">

        {/* LEFT */}
        <div className="navbar-left">

          <button
            className="menu-btn"
            onClick={() => setShow(true)}
          >
            ☰
          </button>

        </div>

        {/* DESKTOP SEARCH */}
        <SearchBox placeholder="Cari transaksi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

        {/* RIGHT */}
        <div className="navbar-right">

          {/* MOBILE SEARCH */}
          <button
            className="search-mobile-btn"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </button>

          <NotificationButton />

          <ProfileMenu />

        </div>

      </header>

      {/* MOBILE SEARCH */}
      {showSearch && (
        <SearchBox placeholder= "Cari transaksi..."
        mobile={true}
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        style={{ width: "300px" }}
      >

        <Offcanvas.Header closeButton>

          <Offcanvas.Title>
            Menu
          </Offcanvas.Title>

        </Offcanvas.Header>

        <Offcanvas.Body>

          <AppSidebar />

        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

export default AppNavbar;