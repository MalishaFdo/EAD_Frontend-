import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import NavBar from '../../components/NavBar';

export default function UpdateTicket() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('Select');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (optionText) => {
        setSelectedOption(optionText);
        setIsDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
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
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    Reservation Date
                                </label>
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
                                <label
                                    htmlFor="destination"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    Destination
                                </label>
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
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="listbox-label" className="block text-sm font-medium leading-6 text-white">
                                    Train Schedules
                                </label>
                                <div className="relative mt-2">
                                    <button
                                        type="button"
                                        className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        aria-haspopup="listbox"
                                        aria-expanded={isDropdownOpen}
                                        onClick={handleDropdownToggle}
                                    >
                                        <span className="flex items-center">
                                            <span className="ml-3 block truncate">{selectedOption}</span>
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <svg
                                                className={`h-5 w-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul
                                        className={`absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${isDropdownOpen ? '' : 'hidden'
                                            }`}
                                        role="listbox"
                                        aria-labelledby="listbox-label"
                                    >
                                        <li
                                            className="text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9"
                                            id="listbox-option-0"
                                            role="option"
                                            onClick={() => handleOptionSelect('Wade Cooper')}
                                        >
                                            <div className="flex items-center">
                                                <span className="font-normal ml-3 block truncate">Wade Cooper</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-normal ml-3 block truncate">Wade Cooper</span>
                                            </div>
                                            <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
