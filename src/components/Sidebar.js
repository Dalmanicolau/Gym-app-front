import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaPeopleGroup, FaMoneyBillTrendUp } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RiPassExpiredFill,RiAdminFill } from "react-icons/ri";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//eslint-disable-next-line
function Sidebar() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div>
        <img src={logo} alt="Logo" className="h-32 ml-2 mt-10" />
         {/* Cuadro de usuario */}
         <div className="bg-gray-100 p-4 mt-4 mb-2 rounded-lg flex items-center h-18 w-48 ml-10">
         <RiAdminFill className="w-12 h-7"/>
          <div>
            <h3 className="text-lg font-semibold">{user?.username}</h3>
            <p className="text-sm text-gray-600">Admin</p>
          </div>
        </div>
        <ul className="menu bg-base-200">
          <li className="p-2 text-2xl">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => isActive
              ? "active border-r-4 border-blue-700 hover:border-r-4 hover:border-blue-700"
              : "hover:border-r-4 hover:border-blue-700"
          }
          style={{ borderRadius: "0px" }}
        >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Panel
            </NavLink>
          </li>

          <li className="p-2 text-2xl">
            <NavLink
              to="/members"
              className={({ isActive }) => isActive
              ? "active border-r-4 border-blue-700 hover:border-r-4 hover:border-blue-700"
              : "hover:border-r-4 hover:border-blue-700"
          }
          style={{ borderRadius: "0px" }}
        >
              <FaPeopleGroup className="text-blue-600" />
              Miembros
            </NavLink>
          </li>

          <li className="p-2 text-2xl">
            <NavLink
              to="/activities"
              className={({ isActive }) => isActive
              ? "active border-r-4 border-blue-700 hover:border-r-4 hover:border-blue-700"
              : "hover:border-r-4 hover:border-blue-700"
          }
          style={{ borderRadius: "0px" }}
        >
              <CgGym className="text-green-600" />
              Actividades
            </NavLink>
          </li>

          <li className="p-2 text-2xl">
            <NavLink
              to="/payments"
              className={({ isActive }) => isActive
              ? "active border-r-4 border-blue-700 hover:border-r-4 hover:border-blue-700"
              : "hover:border-r-4 hover:border-blue-700"
          }
          style={{ borderRadius: "0px" }}
        >
              <FaMoneyBillTrendUp className="text-orange-500" />
              Pagos
            </NavLink>
          </li>

          <li className="p-2 text-2xl">
            <NavLink
              to="/notifications"
              className={({ isActive }) => isActive
              ? "active border-r-4 border-blue-700 hover:border-r-4 hover:border-blue-700"
              : "hover:border-r-4 hover:border-blue-700"
          }
          style={{ borderRadius: "0px" }}
        >
              <RiPassExpiredFill className="text-yellow-500" />
              Notificaciones
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
