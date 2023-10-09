import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTraveler() {

    const navigate = useNavigate();

    // State to hold the NIC input value and error message
    const [nic, setNic] = useState("");
    const [nicError, setNicError] = useState("");

    const handleNicChange = (event) => {
        const value = event.target.value;
        setNic(value);
        // Regular expression to validate NIC (10 digits + V)
        const nicRegex = /^[0-9]{10}V$/;
        if (!nicRegex.test(value)) {
            setNicError("NIC must have 10 digits followed by 'V'");
        } else {
            setNicError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if NIC is valid before submitting the form
        if (!nicError) {
            // Perform form submission logic here
            console.log("Form submitted with NIC: ", nic);
            // You can navigate to another page or perform other actions here
            navigate("/success"); // Example navigation
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-2">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
                            Create Traveler
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="nic"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    NIC
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nic"
                                        name="nic"
                                        type="text"
                                        value={nic}
                                        onChange={handleNicChange}
                                        autoComplete="nic"
                                        required
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${nicError ? "border-red-500" : ""
                                            }`}
                                    />
                                    {nicError && (
                                        <p className="mt-1 text-red-500 text-sm">
                                            {nicError}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-slate-100"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="cpassword"
                                        className="block text-sm font-medium leading-6 text-slate-100"
                                    >
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="cpassword"
                                        name="cpassword"
                                        type="password"
                                        autoComplete="confirm-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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