import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import { getByIdTrainSchedules, updateByIdTrainSchedules } from "../../shared/apiUrls";

export default function UpdateTrainSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ID, setId] = useState("")
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const fetchData = async (id) => {
    try {
      await axios.get(getByIdTrainSchedules(id)).then(result => {
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
    if (id) {
      fetchData(id);
    }
  }, [location.pathname]);

  function handleClick() {
    navigate("/schedule");
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
        departure: formData.departure,
        destination: formData.destination,
        date: formData.scheduleDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
      }
      await axios.put(updateByIdTrainSchedules(ID), data, { headers }).then(result => console.log(result)).catch(error => console.log(error));
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
              Update Train Schedule
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
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
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    Schedule Date
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="date"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={removeTimeFromDate(formData.date)}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    Start Time
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    autoComplete="startTime"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium leading-6 text-slate-100"
                  >
                    End Time
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    autoComplete="endTime"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={updateData}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}