import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import {
  getAllReservations,
  deleteByIdReservations,
} from "../../shared/apiUrls";

export default function TicketDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAllReservations());
        const data = response.data.data;
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function removeTimeFromDate(isoString) {
    const dateTime = new Date(isoString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Function to check if the reservationDate is greater than 5 days from today
  function isReservationDateValid(reservationDate) {
    const today = new Date();
    const fiveDaysFromToday = new Date(today);
    fiveDaysFromToday.setDate(today.getDate() + 5);

    today.setHours(0, 0, 0, 0);
    fiveDaysFromToday.setHours(0, 0, 0, 0);

    const reservationDateTime = new Date(reservationDate);
    reservationDateTime.setHours(0, 0, 0, 0);

    return reservationDateTime > fiveDaysFromToday;
  }

  async function handleDeleteClick(_id) {
    // Find the index of the row to delete
    await axios.delete(deleteByIdReservations(_id));
    alert("Deleted successfully!");
    navigate("/details");
    const dataIndex = data.findIndex((item) => item._id === _id);
    if (dataIndex !== -1) {
      // Create a new array without the row to delete
      const newData = [...data];
      newData.splice(dataIndex, 1);
      setData(newData);
    }
  }

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  // Filter data based on the search text
  const filteredData = data.filter((item) =>
    item.nic.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Reservation Details
            </h2>
          </div>
          <div></div>
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for reservation"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {filteredData.length === 0 ? (
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
                  NIC
                </th>
                <th scope="col" className="px-6 py-3">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3">
                  Departure
                </th>
                <th scope="col" className="px-6 py-3">
                  Reservation Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Seat Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center"></div>
                  </td>
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="pl-3">
                      <div className="text-base font-semibold">{item.nic}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.destination}</td>
                  <td className="px-6 py-4">{item.departure}</td>
                  <td className="px-6 py-4">
                    {removeTimeFromDate(item.reservationDate)}
                  </td>
                  <td className="px-6 py-4">{item.reserveCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {item.status === 0 ? "Active" : "Deactivate"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/updateTicket/${item._id}`}
                      className={`font-medium text-blue-600 dark:text-blue-500 hover:underline ${
                        isReservationDateValid(item.reservationDate)
                          ? ""
                          : "cursor-not-allowed text-gray-400 dark:text-gray-600"
                      }`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className={`font-medium text-blue-600 dark:text-blue-500 hover:underline ${
                        isReservationDateValid(item.reservationDate)
                          ? ""
                          : "cursor-not-allowed text-gray-400 dark:text-gray-600"
                      }`}
                      disabled={!isReservationDateValid(item.reservationDate)}
                    >
                      Delete
                    </button>
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
