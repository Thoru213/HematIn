import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user?.email === formData.email &&
      user?.password === formData.password
    ) {
      localStorage.setItem("isLogin", true);

      alert("Login berhasil!");

      navigate("/dashboard");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow rounded"
      style={{ width: "350px" }}
    >
      <h2 className="mb-4 text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
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
        Login
      </button>

      <p className="text-center m-0">
        Belum punya akun? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;