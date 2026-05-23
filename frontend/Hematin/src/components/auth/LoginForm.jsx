import { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import {
  loginUser
} from "../../services/authService";

const LoginForm = () => {

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({

      email_user: "",
      password: "",

    });

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // LOGIN API
      const response =
        await loginUser({

          email_user:
            formData.email_user,

          password:
            formData.password,

        });

      console.log(response);

      // =========================
      // SIMPAN KE AUTH CONTEXT
      // =========================
      login(response);

      // =========================
      // SIMPAN USER
      // =========================
      localStorage.setItem(

        "user",

        JSON.stringify(
          response.user
        )

      );

      // =========================
      // SIMPAN TOKEN
      // =========================
      localStorage.setItem(

        "token",

        response.token

      );

      // =========================
      // PINDAH HALAMAN
      // =========================
      window.location.href =
        "/dashboard";

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Login gagal"

      );

    }

  };

  return (

    <form
      className="p-4 shadow rounded"
      onSubmit={handleLogin}
    >

      <h2 className="mb-4 text-center">
        Login
      </h2>

      {/* EMAIL */}
      <input

        type="email"

        placeholder="Email"

        className="form-control mb-3"

        value={formData.email_user}

        onChange={(e) =>

          setFormData({

            ...formData,

            email_user:
              e.target.value

          })

        }

      />

      {/* PASSWORD */}
      <input

        type="password"

        placeholder="Password"

        className="form-control mb-3"

        value={formData.password}

        onChange={(e) =>

          setFormData({

            ...formData,

            password:
              e.target.value

          })

        }

      />

      {/* BUTTON */}
      <button
        type="submit"
        className="btn btn-danger w-100 mb-3"
      >

        Login

      </button>

      {/* REGISTER */}
      <p className="text-center mt-3">

        Belum punya akun?
        {" "}

        <Link to="/register">

          Daftar

        </Link>

      </p>

    </form>

  );

};

export default LoginForm;