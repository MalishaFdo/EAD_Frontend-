import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { getAllTrainSchedules } from "../../shared/apiUrls";
import { Link } from "react-router-dom";

export default function Reservation() {
  const [trainScheduleId, setTrainScheduleId] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(getAllTrainSchedules());
  //       const data = response.data.data;
  //       console.log("RESPONSE ******", data);
  //       setData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAllTrainSchedules());
        const allData = response.data.data;

        const today = new Date();
        const thirtyDaysFromToday = new Date(today);
        thirtyDaysFromToday.setDate(today.getDate() + 30);

        const filteredData = allData.filter((item) => {
          const scheduleDate = new Date(item.scheduleDate);
          return scheduleDate <= thirtyDaysFromToday;
        });

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function handleEditClick(id) {
    navigate(`/updatereservation/${id}`);
  }

  function removeTimeFromDate(isoString) {
    const datePart = isoString.split("T")[0];
    return datePart.toString();
  }

  function handleDeleteClick(_id) {
    // Find the index of the row to delete
    const dataIndex = data.findIndex((item) => item._id === _id);
    if (dataIndex !== -1) {
      // Create a new array without the row to delete
      const newData = [...data];
      newData.splice(dataIndex, 1);
      setData(newData);
    }
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Reservations
            </h2>
          </div>
          <div></div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for trains"
            />
          </div>
        </div>
        {data.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No data available.
          </p>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Departure
                </th>
                <th scope="col" className="px-6 py-3">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3">
                  Avaliable Seats
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Stat Time
                </th>
                <th scope="col" className="px-6 py-3">
                  End Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center"></div>
                  </td>
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {item.departure}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.destination}</td>
                  <td className="px-6 py-4">{item.availableSeatCount}</td>
                  <td className="px-6 py-4">
                    {removeTimeFromDate(item.scheduleDate)}
                  </td>
                  <td className="px-6 py-4">{item.startTime}</td>
                  <td className="px-6 py-4">{item.endTime}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/createTicket?departure=${
                        item.departure
                      }&destination=${item.destination}&availableSeats=${
                        item.availableSeatCount
                      }&date=${removeTimeFromDate(
                        item.scheduleDate
                      )}&startTime=${item.startTime}&endTime=${
                        item.endTime
                      }&trainScheduleId=${item._id}`}
                    >
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Reserve
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
