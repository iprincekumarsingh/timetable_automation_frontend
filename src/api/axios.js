import axios from "axios";

export default axios.create({
  baseURL: "https://timetable-automation-frontend.vercel.app/api/v1",
});
