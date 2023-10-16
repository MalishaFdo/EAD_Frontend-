import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { createTrainScheduleUrlPost, getAllTrains } from "../../shared/apiUrls";

//import { useAlert } from "react-alert";

export default function CreateTrainSchedule() {
  //const alert = useAlert();
  const [trains, setTrains] = useState({
    trainName: "",
    trainId: "",
  });

  const [trainData, setTrainData] = useState([]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trainId: trains.trainId,
    departure: "",
    destination: "",
    scheduleDate: "",
    startTime: "",
    endTime: "",
    trainName: "",
  });

  useEffect(() => {
    loadTrains();
  }, []);

  function convertDateFormat(inputDate) {
    const dateObject = new Date(inputDate);
    return dateObject.toISOString();
  }

  const sendData = async (e) => {
    e.preventDefault();
    if (
      !formData.departure ||
      !formData.destination ||
      !formData.scheduleDate ||
      !formData.startTime ||
      !formData.endTime
    ) {
      // Check if any required field is empty
      // Display an error message or prevent form submission
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const requestData = {
        trainId: trains.trainId,
        departure: formData.departure,
        destination: formData.destination,
        scheduleDate: formData.scheduleDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      await axios
        .post(createTrainScheduleUrlPost(), requestData, { headers })
        .then((results) => {
          alert("Train Schedule sucessfully created!");
          navigate("/schedule");
        })
        .catch((error) => {
          console.log(error);
          alert.error("Error creating train schedule!");
        });
    } catch (error) {
      alert("Error submitting data:" + error.message);
    }
  };

  const loadTrains = async () => {
    try {
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      await axios
        .get(getAllTrains(), { headers })
        .then((results) => {
          const data = results.data.data;
          setTrainData(data);
          setTrains({ trainId: data._id, trainName: data.name });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      alert("Error submitting data:" + error.message);
    }
  };

  // const handleSelectChange = (e) => {
  //   const selectedTrainName = e.target.value;
  //   const selectedTrain = trainData.find(
  //     (train) => train.trainName === selectedTrainName
  //   );

  //   if (selectedTrain) {
  //     setFormData({ ...formData, trainName: selectedTrainName });
  //   } else {
  //     setFormData({ ...formData, trainName: "" });
  //   }
  // };

  const handleSelectChange = (e) => {
    const selectedTrainName = e.target.value;
    const selectedTrain = trainData.find(
      (train) => train.trainName === selectedTrainName
    );

    if (selectedTrain) {
      // Update the train state with the selected train's trainId
      setTrains({
        trainId: selectedTrain._id,
        trainName: selectedTrain.trainName,
      });
    }
  };

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
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="train"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Select a train
                </label>
                <div className="mt-2">
                  <select
                    id="train"
                    name="train"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => handleSelectChange(e)}
                    value={trainData.trainName} // Set the selected value based on formData
                  >
                    <option value={null}>Select a train</option>
                    {trainData.map((train) => (
                      <option key={train._id} value={train.trainName}>
                        {train.trainName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                    onChange={(e) =>
                      setFormData({ ...formData, departure: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleDate: convertDateFormat(e.target.value),
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
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
