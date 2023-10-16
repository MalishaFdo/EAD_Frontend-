import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import {
  getByIdReservations,
  updateByIdReservations,
} from "../../shared/apiUrls";

export default function UpdateTicket() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ID, setId] = useState("");

  const [formData, setFormData] = useState({
    nic: "",
    reservationDate: "",
    reserveCount: "",
    status: "",
  });

  const fetchData = async (id) => {
    try {
      await axios
        .get(getByIdReservations(id))
        .then((result) => {
          if (!result.data) {
            throw new Error("Data is undefined");
          }
          let data = result.data.data;
          const date = removeTimeFromDate(data.reservationDate);
          data = {
            ...data,
            reservationDate: date,
          };
          setFormData({
            nic: data.nic,
            reservationDate: date,
            reserveCount: data.reserveCount,
            status: data.status,
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      alert("Error fetching data:" + error.message);
    }
  };

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    setId(id);
    fetchData(id);
  }, []);

  function handleClick() {
    navigate("/details");
  }

  function removeTimeFromDate(isoString) {
    const dateTime = new Date(isoString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const updateData = async (e) => {
    e.preventDefault();
    if (
      !formData.reservationDate ||
      !formData.reserveCount ||
      !formData.status
    ) {
      // Check if any required field is empty
      // Display an error message or prevent form submission
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      const data = {
        // nic: formData.nic,
        reservationDate: formData.reservationDate,
        reserveCount: formData.reserveCount,
        status: formData.status,
      };
      await axios
        .patch(updateByIdReservations(ID), data, { headers })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
        alert("Data Updated successfully!");
      handleClick();
    } catch (error) {
      alert("Error fetching data:" + error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Update Reservation
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
                    onChange={(e) =>
                      setFormData({ ...formData, nic: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Reservation Date
                </label>
                <div className="mt-2">
                  <input
                    id="reservationDate"
                    name="reservationDate"
                    type="date"
                    autoComplete="date"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.reservationDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reservationDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="seats"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    No of Seats
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="seats"
                    name="seats"
                    type="number"
                    autoComplete="seats"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.reserveCount}
                    onChange={(e) =>
                      setFormData({ ...formData, reserveCount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="Status"
                      value="Active"
                      checked={formData.status === 0}
                      onChange={() => setFormData({ ...formData, status: 0 })}
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-100">Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="Status"
                      value="Archive"
                      checked={formData.status === 1}
                      onChange={() => setFormData({ ...formData, status: 1 })}
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-100">Archive</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="Status"
                      value="Archive"
                      checked={formData.status === 2}
                      onChange={() => setFormData({ ...formData, status: 2 })}
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-100">Complete</span>
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
