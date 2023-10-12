import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import { getUserById, updateByIdUser } from "../../shared/apiUrls";

export default function UpdateTraveler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ID, setId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nic: "",
    status: "",
    role: ""
  });


  const fetchData = async (id) => {
    try {
      await axios.get(getUserById(id)).then(result => {
        console.log(result);
        if (!result.data) {
          throw new Error("Data is undefined");
        }
        setFormData(result.data);
      }).catch(err => console.log(err));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    setId(id);
    fetchData(id);
  }, []);

  function handleClick() {
    navigate("/travelInfo");
  }

  const updateData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      const data = {
        nic: formData.nic,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 0,
        status: Number(formData.status)
      }
      await axios.put(updateByIdUser(ID), data, { headers }).then(result => console.log(result)).catch(error => console.log(error));
      handleClick();
      //}

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <NavBar /> {/* Include the NavBar component at the top */}
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Update Traveler
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="nic"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  NIC
                </label>
                <div className="mt-2">
                  <input
                    id="nic"
                    name="nic"
                    type="text"
                    autoComplete="nic"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.nic}
                    readOnly={true}
                    onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Email
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
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
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
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
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirm-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-2">
                <div className="flex justify-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="0"
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />
                    <span className="text-slate-100">Activate</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="1"
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />
                    <span className="text-slate-100">Deactivate</span>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={updateData}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
