import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";

export default function CreateTrainSchedule() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/schedules");
  }
  return (
    <>
      <NavBar /> {/* Include the NavBar component at the top */}
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Create Train Schedule
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
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
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleClick}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
