import React from "react";
import axios from "../api/axios";
import { useEffect } from "react";
import Cookie from "js-cookie";

// Toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
    useEffect(() => {
        const token = Cookie.get("access_token");
        if (!token) {
            window.location.href = "/login";    
        }

    }, []);

    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const API_URL = "auth/register";
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_URL, JSON.stringify({ name, email, phone, password }), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Cookie.get("access_token"),
                },
            })
            .then((res) => {
                console.log(res);
                toast(res.data.message)
            })
            .catch((err) => {
            
                toast.error(err.response.data.message);
            });
    };
    return (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="w-full max-w-md space-y-8">
                <div>
                    
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Add Teacher
                    </h2>
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                >
                    {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only mb-4 mt-4">
                                Name
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="name"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only mb-4 mt-4">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Email address"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only mb-4 mt-4">
                                Phone
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="text" 
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Phone No"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setPhone(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                 
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span> */}
                            Add Teacher
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
