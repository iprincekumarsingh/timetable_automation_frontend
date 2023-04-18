import React, { useState } from "react";
import axios from "../api/axios";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { Label } from "flowbite-react";
import { Select } from "flowbite-react";

// Toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignTeacher = () => {
  useEffect(() => {
    const token = Cookie.get("access_token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const [classs, setClasss] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState([]);
  const [subjectTeacher, setSubjectTeacher] = useState([]);
  // destructtor the state
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [clas, setClas] = useState("");

  const API_URL = "slots";
  const searchSubject = (e) => {
    // getting class by class selected
    axios
      .get("subject/searchSubject" + "/" + e, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        // console.log(res);
        setSubjects(res.data.subjects);
        // console.log();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("teacher/getsubject/" + e, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        // access the name and email from responnse

        setSubjectTeacher(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // gettting all class
  useEffect(() => {
    axios
      .get("class", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        // toast.success("Class fetched successfully");
        setClasss(res.data.classes);

        // console.log(s);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/auth/getTeachers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        // console.log(res.data.teachers);

        setUser(res.data.teachers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user: teacher,
      subject: subject,
      classes: clas,
    };
    // console.log(data);
    axios
      .post("teacher", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("access_token"),
        },
      })
      .then((res) => {
        toast.success("Teacher assigned successfully");
        console.log(res);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  // const DataTable = subjectTeacher.map((option) => {
  //   return (
  //     <tr className="border">
  //       <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
  //         {option.subject}
  //       </td>
  //       <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
  //         {option.classes}
  //       </td>
  //       <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
  //         {option.user}
  //       </td>
  //       <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">

  //       </td>
  //     </tr>
  //   );
  // });

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Assigned Teacher to Subject
            </h2>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select Class" />
              </div>
              <Select
                onChange={(e) => {
                  // get clas name from select
                  const classId = e.target.value;
                  const clas = classId;
                  setClas(clas);

                  // get all subject of that class
                  searchSubject(classId);
                }}
                id="countries"
                required={true}
              >
                {" "}
                <option value="">Select Class</option>
                {/* show all the list in class usestate */}
                {classs.map((classs) => (
                  <option key={classs.name} value={classs.name}>
                    {classs.name}
                  </option>
                ))}
              </Select>
            </div>{" "}
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select Subjects" />
              </div>
              <Select
                onChange={(e) => {
                  console.log(e.target.value);
                  const subjectId = e.target.value;
                  const subject = subjectId;
                  setSubject(subject);
                }}
                id="countries"
                required={true}
              >
                <option value="">Select Subject</option>
                {/* c */}
                {/* check length of the subjects */}
                {subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <option key={subject.subject} value={subject.subject}>
                      {subject.subject}
                    </option>
                  ))
                ) : (
                  <option value="">Nothing Found </option>
                )}
              </Select>
            </div>
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select Teachers " />
              </div>
              <Select
                onChange={(e) => {
                  console.log(e.target.value);
                  const teacherId = e.target.value;
                  const teacher = teacherId;
                  setTeacher(teacher);
                  console.log(teacher);
                }}
                id="countries"
                required={true}
              >
                {user.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span> */}
                Assign Teacher
              </button>
            </div>
          </form>
        </div>
      </div>{" "}
      <div className="h-full w-full absolute">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl mt-10">Assigned Teachers</h1>
          <div className="w-full h-64 rounded  flex justify-center">
            {/* Place your content here */}
            <div className="overflow-x-auto">
              <table className="  divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Teacher Name
                    </th>

                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Subject
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Class
                    </th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                {/* <tbody className="divide-y divide-gray-200">{DataTable}</tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignTeacher;
