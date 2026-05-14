const ProfileMenu = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="profile-box">

      <img
        src="https://i.pravatar.cc/100"
        alt="profile"
      />

      <div>

        <h5>
          {user ? user.username : "User"}
        </h5>

        <p>
          User
        </p>

      </div>

    </div>
  );
};

export default ProfileMenu;