import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { createUserUrlPost } from "../shared/apiUrls";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nic: "",
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [nicError, setNicError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const sendData = async () => {
    if (
      !formData.nic ||
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      // Check if any required field is empty
      // Display an error message or prevent form submission
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateNIC(formData.nic)) {
      alert("Invalid NIC format. Please enter a valid NIC.");
      return;
    } else {
      setNicError(null);
    }

    if (!validateEmail(formData.email)) {
      alert("Invalid email address. Please enter a valid email.");
      return;
    } else {
      setEmailError(null);
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    } else {
      setPasswordError(null);
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const requestData = {
        nic: formData.nic,
        name: formData.name,
        email: formData.email,
        Role: 1,
        password: formData.password,
      };

      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      await passwordMatch(formData.password, formData.confirmPassword);

      await axios.post(
        createUserUrlPost(),
        requestData,
        { headers },
        (response) => {
          // Success callback function
          alert("Data inserted successfully!");
          //console.log("Data inserted successfully!");
          navigate("/");
        }
      );
    } catch (error) {
      alert("Error submitting data:" + error.message);
    }

    async function passwordMatch(password, confirmPassword) {
      if (confirmPassword == password) {
        return;
      }
    }

    function validateNIC(nic) {
      const nicRegex = /^[0-9]{9}[vV]$/;
      return nicRegex.test(nic);
    }

    function validateEmail(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Registration
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    National ID
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="nic"
                      name="nic"
                      type="text"
                      autoComplete="nic"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setFormData({ ...formData, nic: e.target.value });
                        setNicError(null);
                      }}
                    />
                    {nicError && (
                      <p className="text-red-500 text-sm mt-2">{nicError}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setEmailError(null);
                    }}
                  />

                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Admin Role
                </label>
                <div className="flex justify-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="Status"
                      value="Active"
                      checked={formData.role === 1}
                      onChange={() => setFormData({ ...formData, role: 1 })}
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-100">Back Officer</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="Status"
                      value="Archive"
                      checked={formData.role === 2}
                      onChange={() => setFormData({ ...formData, role: 2 })}
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-100">Travel Agent</span>
                  </label>
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
                </div>
                <div className="mt-2.5">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cpassword"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2.5">
                  <input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    autoComplete="confirm-password"
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={sendData}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
