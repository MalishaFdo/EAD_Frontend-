import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { userLoginUrlPost } from "../shared/apiUrls";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };

    await axios
      .post(userLoginUrlPost(), requestData, {
        headers,
      })
      .then((response) => {
        const user = response.data.value.data;
        if (user.role === 1 || user.role === 2) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.value.data)
          );
          alert("Login successful!");
          navigate("/home");
        } else {
          alert("Only authorized users can login!");
        }
        // Navigate to the /home route
      })
      .catch((error) => {
        console.log(error);
        alert("Error submitting data: " + error.message);
      });
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      alert("Invalid email address. Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-20 w-auto" src={logo} alt="EAD TRAVEL" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-slate-100 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleClick}
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-slate-100">
              Not Having an Account?{" "}
              <a
                href="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register Here !!!
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
