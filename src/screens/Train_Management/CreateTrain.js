import { json, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { createTrainUrlPost } from "../../shared/apiUrls";

export default function CreateTrain() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trainName: "",
    seatCount: "",
  });

  const fetchData = async (e) => {
    e.preventDefault();
    if (!formData.trainName || !formData.seatCount) {
      // Check if any required field is empty
      // Display an error message or prevent form submission
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (formData.trainName && formData.seatCount) {
        const requestData = {
          trainName: formData.trainName,
          seatCount: formData.seatCount,
        };

        const headers = {
          "Content-Type": "application/json;charset=UTF-8",
        };

        const response = await axios.post(createTrainUrlPost(), requestData, {
          headers,
        });

        const createdTrain = response.data.data._id;
        localStorage.setItem("trainId", createdTrain);
        alert("Data inserted successfully!");
        navigate("/alltrains");
      }
    } catch (error) {
      alert("Error submitting data:" + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.seatCount.length < 1) {
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavBar /> {/* Include the NavBar component at the top */}
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
              Create Train
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="tName"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Train Name
                </label>
                <div className="mt-2">
                  <input
                    id="tName"
                    name="tName"
                    type="text"
                    autoComplete="tName"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.trainName}
                    onChange={(e) =>
                      setFormData({ ...formData, trainName: e.target.value })
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
                    value={formData.seatCount}
                    onChange={(e) =>
                      setFormData({ ...formData, seatCount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={fetchData}
                >
                  Sumbit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
