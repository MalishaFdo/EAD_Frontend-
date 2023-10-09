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
                                <label id="listbox-label" class="block text-sm font-medium leading-6 text-white">User Type</label>
                                <div class="relative mt-2">
                                    <button type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                        <span class="flex items-center">
                                            <span class="ml-3 block truncate">Choose....</span>
                                        </span>
                                        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    </button>
                                         <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                        <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                                            <div class="flex items-center">

                                                <span class="font-normal ml-3 block truncate">Back Officer</span>
                                                
                                            </div>

                                            <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </li>
                                        <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                                            <div class="flex items-center">

                                                <span class="font-normal ml-3 block truncate">Travel Agent</span>
                                                
                                            </div>

                                            <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </li>
                                    </ul>
                                    
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
