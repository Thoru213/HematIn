import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(formData));

    alert("Register berhasil!");

    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow rounded"
      style={{ width: "350px" }}
    >
      <h2 className="mb-4 text-center">Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Nama"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <input
        type="nohp"
        name="nohp"
        placeholder="No Telepon"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <button className="btn btn-danger w-100 mb-3">
        Register
      </button>

      <p className="text-center m-0">
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm;