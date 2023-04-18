import React, { useState } from "react";
import axios from "./api/axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
export default function Home() {
  const { id } = useParams();

  const API_URL = "timetable/timetable"
  //   console.log(id);
  const [options, setOptions] = useState([]);
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      })
      .then((response) => {
        // console.log(response.data.user);
        setOptions(response.data.timetable);
        // console.log(response);
        //  set all day in state where day is monday
        setMonday(
          response.data.timetable.filter((day) => day.day === "monday")
        );
        setTuesday(
          response.data.timetable.filter((day) => day.day === "tuesday")
        );
        setWednesday(
          response.data.timetable.filter((day) => day.day === "wednesday")
        );
        setThursday(
          response.data.timetable.filter((day) => day.day === "thursday")
        );
        setFriday(
          response.data.timetable.filter((day) => day.day === "friday")
        );
        setSaturday(
          response.data.timetable.filter((day) => day.day === "saturday")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center border-dashed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Day
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Period
            </th>
            <th scope="col" className="px-6 py-3">
              Class & section
            </th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "2px", borderBottomColor: "black" }}>
          <th className="px-6 py-4" rowSpan={monday.length + 1}>
            Monday
          </th>
          {monday.map((day) => (
            <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {/* table data span if all the day is monday */}
                <td className="px-6 py-4">{day.time}</td>
                <td className="px-6 py-4">{day.subject}</td>
                <td className="px-6 py-4">{day.period}</td>
                <td className="px-6 py-4">{day.classs}</td>
              </tr>
            </>
          ))}
        </tbody>
        <tbody style={{ border: "1", borderTopColor: "black" }}>
          <th className="px-6 py-4" rowSpan={monday.length + 1}>
            Tuesday
          </th>
          {tuesday.map((day) => (
            <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {/* table data span if all the day is monday */}
                <td className="px-6 py-4">{day.time}</td>
                <td className="px-6 py-4">{day.subject}</td>
                <td className="px-6 py-4">{day.period}</td>
                <td className="px-6 py-4">{day.classs}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
