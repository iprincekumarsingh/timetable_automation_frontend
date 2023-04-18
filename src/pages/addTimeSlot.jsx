import React, { useState } from "react";
import axios from "../api/axios";
import { useEffect } from "react";
import Cookie from "js-cookie";

// Toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTimeSloot = () => {
  useEffect(() => {
    const token = Cookie.get("access_token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  // const [name, setName] = useState("");
  const [time, setTime] = useState([]);
  const [oldtime, setOldtime] = useState([]);
  const API_URL = "slots";

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        //  console.log(res.data.sections);
        setOldtime(res.data.slots);

        console.log(res);
        // setTimeslot(res.data.sections);
      })
      .catch((err) => {
        // toast.error(err.response.data.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        API_URL,
        JSON.stringify({
          time,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("access_token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast(res.data.message);
        axios
          .get(API_URL, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + Cookie.get("access_token"),
            },
          })
          .then((res) => {
            //  console.log(res.data.sections);
            setOldtime(res.data.slots);

            console.log(res);
            // setTimeslot(res.data.sections);
          })
          .catch((err) => {
            // toast.error(err.response.data.message);
          });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const deleteClass = (id) => {
    const yes = window.confirm("Are you sure you want to delete this class?");
    if (yes) {
      axios
        .delete(API_URL + "/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("access_token"),
          },
        })
        .then((res) => {
          console.log(res);
          toast(res.data.message);
          // after deleting the class, we need to update the list of classes
          axios
            .get(API_URL, {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + Cookie.get("access_token"),
              },
            })
            .then((res) => {
              //  console.log(res.data.sections);
              setOldtime(res.data.slots);

              console.log(res);
              // setTimeslot(res.data.sections);
            })
            .catch((err) => {
              // toast.error(err.response.data.message);
            });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  const DataTable = oldtime.map((option) => {
    return (
      <tr className="border">
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {option.timeslot}
        </td>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {/* add a button to delete the text
           */}
          <button
            style={{
              background: "red",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
            onClick={(e) => deleteClass(option._id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create Time Slots
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
                  Class
                </label>
                <input
                  id="email-address"
                  name="Eneremail"
                  type="text"
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter timeslot , eg : 8AM - 9AM"
                  onChange={(e) => setTime(e.target.value)}
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
                Add TimeSlot
              </button>
            </div>
          </form>
        </div>
      </div>{" "}
      <div className="h-full w-full absolute">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl mt-10">All Time Slot</h1>
          <div className="w-full h-64 rounded  flex justify-center">
            {/* Place your content here */}
            <div className="overflow-x-auto">
              <table className="  divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Section
                    </th>

                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Tools
                    </th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">{DataTable}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTimeSloot;
