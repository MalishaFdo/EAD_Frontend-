import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import { getByIdReservations, updateByIdReservations } from "../../shared/apiUrls";

export default function UpdateTicket() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ID, setId] = useState("")
  const [formData, setFormData] = useState({
    nic: "",
    // departure: "",
    // destination: "",
    reservationDate: "",
    reserveCount: "",
    status: ""
  });

  const fetchData = async (id) => {
    try {
      await axios.get(getByIdReservations(id)).then(result => {
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
    navigate("/details");
  }

  function removeTimeFromDate(isoString) {
    const datePart = isoString.split('T')[0];
    return datePart.toString();
  }

  const updateData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      const data = {
        nic: formData.nic,
        // departure: formData.departure,
        // destination: formData.destination,
        reservationDate: formData.reservationDate,
        reserveCount: formData.reserveCount,
        status: Number(formData.status)
      }
      await axios.put(updateByIdReservations(ID), data, { headers }).then(result => console.log(result)).catch(error => console.log(error));
      handleClick();

    } catch (error) {
      console.error("Error fetching data:", error);
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
                    onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                  />
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="departure"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Departure Location
                </label>
                <div className="mt-2">
                  <input
                    id="departure"
                    name="departure"
                    type="text"
                    autoComplete="departure"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    Destination Location
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    autoComplete="destination"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                </div>
              </div> */}
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
                    onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
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
                    value={formData.seatCount}
                    onChange={(e) => setFormData({ ...formData, seatCount: e.target.value })}
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
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-100">Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="Status"
                      value="Archive"
                      className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-100">Archive</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="Status"
                      value="Archive"
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
