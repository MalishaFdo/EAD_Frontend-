import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import {
  getAllTrainSchedules,
  deleteByIdTrainSchedules,
} from "../../shared/apiUrls";

export default function ExistingTrainSchedule() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAllTrainSchedules());
        const data = response.data.data;
        // await filterUser(data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function handleEditClick(id) {
    navigate(`/updateschedule/${id}`);
  }

  function removeTimeFromDate(isoString) {
    const datePart = isoString.split("T")[0];
    return datePart.toString();
  }

  async function handleDeleteClick(_id) {
    // Find the index of the row to delete
    await axios.delete(deleteByIdTrainSchedules(_id));
    alert("Deleted successfully!");
    navigate("/schedule");
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
  const filteredData = data.filter((item) => item.departure.toLowerCase().includes(searchText.toLowerCase()));


  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Train Schedules
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
                  Departure
                </th>
                <th scope="col" className="px-6 py-3">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3">
                  Seats
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
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
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
                      {item.status === 0 ? "Active" : "Deactivate"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/updateschedule/${item._id}`} // Pass the ID as a parameter
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {/* Edit Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        {/* Placeholder Edit Icon path */}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      {/* Delete Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        {/* Placeholder Delete Icon path */}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </a>
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
