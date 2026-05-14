const GreetingHeader = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="greeting-header">

      <div>
        <h2>
          Halo, {user?.username}
        </h2>

        <p>
          Ini ringkasan keuanganmu hari ini.
        </p>
      </div>

    </div>
  );
};

export default GreetingHeader;