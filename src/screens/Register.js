import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Register() {
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
                            Registration
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-6 text-slate-100"
                                    >
                                        Name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="nic"
                                        className="block text-sm font-medium leading-6 text-slate-100"
                                    >
                                        National ID
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="nic"
                                            name="nic"
                                            type="text"
                                            value={nic}
                                            onChange={handleNicChange}
                                            autoComplete="nic"
                                            required
                                            className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${nicError ? "border-red-500" : ""
                                                }`}
                                        />
                                        {nicError && (
                                            <p className="mt-1 text-red-500 text-sm">
                                                {nicError}
                                            </p>
                                        )}
                                    </div>
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
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium leading-6 text-slate-100"
                                >
                                    User Role
                                </label>
                                <div className="mt-2">
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="Status"
                                            value="Active"
                                            className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-slate-100">Back Officer</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="Status"
                                            value="Deactive"
                                            className="form-radio h-4 w-4 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-slate-100">Travel Agent</span>
                                    </label>
                                </div>
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
                                <div className="mt-2.5">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                <div className="mt-2.5">
                                    <input
                                        id="cpassword"
                                        name="cpassword"
                                        type="password"
                                        autoComplete="confirm-password"
                                        required
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
