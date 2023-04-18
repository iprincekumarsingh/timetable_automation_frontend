import React from "react";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  useEffect(() => {
    const token = Cookie.get("access_token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  const [profile, SetProfile] = useState([]);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const API_URL = "auth/profile";
  const API_UPDATE = "auth/profile/update";

  // get user profile data
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        SetProfile(res.data.user);
        console.log(profile);
        setEmail(res.data.user.email);
        setName(res.data.user.name);
        setPhone(res.data.user.phone);
        setName(res.data.user.name);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message);
      });
  }, []);

  // submiitting
  const handleSubmit = (e) => {
    e.preventDefault(e);

    axios
      .put(API_UPDATE, JSON.stringify({ name, email, phone, password }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const UpdatePassword = (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error("Password is required");
    }
    axios.put("auth/profile/password/update", JSON.stringify({ password }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast(res.data.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Profile
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
                placeholder={profile.name}
                onChange={(e) => {
                  console.log(e.target.value);
                  setName(e.target.value);
                }}
                defaultValue={profile.name}
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
                placeholder={profile.email}
                onChange={(e) => {
                  console.log(e.target.value);
                  setEmail(e.target.value);
                }}
                defaultValue={profile.email}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only mb-4 mt-4">
                Phone
              </label>
              <input
                type="text"
                autoComplete="email"
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  console.log(e.target.value);
                  setPhone(e.target.value);
                }}
                defaultValue={profile.phone}
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
              Update Profile
            </button>
          </div>
        </form>
        <h2 className="text-3xl mt-10 text-center">OR</h2>

        <form onSubmit={(e) => UpdatePassword(e)}>
          <div className="mt-8">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="Change Password"
              className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Change Password "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div>
              <button
                type="submit"
                className="group mt-10 relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span> */}
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
