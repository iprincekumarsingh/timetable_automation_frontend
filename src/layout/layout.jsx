import { Navbar } from "flowbite-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import { Dropdown } from "flowbite-react";
const Layout = ({ }) => {
  return (
    <div className="">
      <Navbar fluid={true} rounded={true} className="self-center">
        <Navbar.Brand to="/">
          <Link to={"/"}>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              TimeTable
            </span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {Cookies.get("role") == "employee" ? (
            <>
              <Navbar.Link active="true">
                <Link to={"/timetable"}>Home</Link>
              </Navbar.Link>
            </>
          ) : (
            ""
          )}

          {Cookies.get("access_token") ? (
            <>
              {Cookies.get("role") === "admin" ? (
                <>
                  <NavLink Link="">
                    <Dropdown
                      arrowIcon={true}
                      inline={true}
                      label="Subjects & slots"
                    >
                      <Dropdown.Item>
                        <Link to={"create-timeslot"}>Create Time Slots</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to={"create-class"}>Create Class</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to={"create-section"}>Create Section</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to={"create-subject"}>Create Subject</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to={"assign-teachers"}>Assign Teachers</Link>
                      </Dropdown.Item>
                    </Dropdown>
                  </NavLink>
                
                  <Navbar.Link href="/navbars">
                <Link to={"create-Account"}> Add teacher</Link>
              </Navbar.Link>
                  {/* <Link to={"create-Account"}></Link> */}
                </>
              ) : (
                ""
              )}

              <Navbar.Link href="/navbars">
                <Link to={"profile"}>Profile</Link>
              </Navbar.Link>
              <Navbar.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  Cookies.remove("access_token");
                  Cookies.remove("role");
                  window.location.href = "/login";
                }}
              >
                Logout
              </Navbar.Link>
            </>
          ) : (
            <Navbar.Link href="/navbars">
              <Link to={"login"}>Login</Link>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
