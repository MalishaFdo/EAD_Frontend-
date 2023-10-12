import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import { createReservationUrlPost, getAllTrainSchedules } from "../../shared/apiUrls";

export default function CreateTicket() {
    const location = useLocation();
    const navigate = useNavigate();

    // State to store train schedule data
    const [trainScheduleData, setTrainScheduleData] = useState({
        trainScheduleId: "",
        destination: "",
        departure: "",
        startTime: "",
        endTime: "",
        scheduleDate: ""
    });

    const [formData, setFormData] = useState({
        nic: "",
        reserveCount: 0,
    });

    // Function to fetch train schedule data based on trainScheduleId
    // const fetchTrainScheduleData = async (trainScheduleId) => {
    //     try {
    //         const response = await axios.get(`${getAllTrainSchedules}/${trainScheduleId}`);
    //         const data = response.data;

    //         // Update the state with the retrieved data
    //         setTrainScheduleData({
    //             trainScheduleId: data.trainScheduleId,
    //             destination: data.destination,
    //             departure: data.departure,
    //             startTime: data.startTime,
    //             endTime: data.endTime,
    //         });
    //     } catch (error) {
    //         console.error("Error fetching train schedule data:", error);
    //     }
    // };

    // Check if trainScheduleId is present in the URL and fetch data
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const trainScheduleId = urlSearchParams.get("trainScheduleId");
        const departure = urlSearchParams.get("departure");
        const destination = urlSearchParams.get("destination");
        const scheduleDate = urlSearchParams.get("date");
        const startTime = urlSearchParams.get("startTime");
        const endTime = urlSearchParams.get("endTime");

        const data = {
            trainScheduleId,
            departure,
            destination,
            scheduleDate,
            startTime,
            endTime
        }
        setTrainScheduleData(data);

        if (data.trainScheduleId) {
            setFormData({ ...formData, trainScheduleId });
        }
    }, []);

    const sendData = async () => {
        try {
            const requestData = {
                trainScheduleId: trainScheduleData.trainScheduleId,
                nic: formData.nic,
                reserveCount: formData.reserveCount,
                reservationDate: trainScheduleData.scheduleDate
            };

            const headers = {
                "Content-Type": "application/json;charset=UTF-8",
            };
            await axios.post(createReservationUrlPost(), requestData, { headers }).then(results => {
                console.log(results.data);
            }).catch(err => {
                console.log(err);
            });

            navigate("/details");
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
                            Create Reservation
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="nic"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    National ID
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nic"
                                        name="nic"
                                        type="text"
                                        autoComplete="nic"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="count"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    Number of Reservations
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="count"
                                        name="count"
                                        type="number"
                                        autoComplete="count"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setFormData({ ...formData, reserveCount: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={sendData}
                                >
                                    Reserve
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};