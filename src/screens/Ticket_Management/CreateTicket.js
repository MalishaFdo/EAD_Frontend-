import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import { createReservationUrlPost, getAllTrainSchedules } from "../../shared/apiUrls";

export default function CreateTicket() {
    const nic = localStorage.getItem("nic");
    const location = useLocation();

    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('Select');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({
        nic: nic,
        reserveCount: "",
    });

    function convertDateFormat(inputDate) {
        const dateObject = new Date(inputDate);
        return dateObject.toISOString();
    }

    const sendData = async () => {
        try {
            const requestData = {
                nic: formData.nic,
                reserveCount: formData.reserveCount,
            };

            const headers = {
                "Content-Type": "application/json;charset=UTF-8",
            };

            const response = await axios.post(
                createReservationUrlPost(),
                requestData,
                { headers }
            );
            navigate("/schedule");
        }
        catch (error) {
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
                                        type="nic"
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