import React, { useState } from "react";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Teacher() {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get("timetable/teacher", {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      })
      .then((response) => {
        // console.log(response.data.user);
        setOptions(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // now i want to show all teacher name in select option

  const DataTable = options.map((option) => {
    return (
      <tr className="border">
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {option.name}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {option.email}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {option.phone}
        </td>

        <td className="whitespace-nowrap px-4 py-2 gap-5">
          <Link
            to={`/teacher-view/${option._id}`}
            className="ml-4 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            View
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <>
      <div className="h-full w-full absolute">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl mt-10">All Teachers</h1>
          <div className="w-full h-64 rounded  flex justify-center">
            {/* Place your content here */}
            <div className="overflow-x-auto">
              <table className="  divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Email
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Phone
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
}
