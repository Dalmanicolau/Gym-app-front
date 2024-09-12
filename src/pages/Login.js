import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "../redux/actions/Auth";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const userData = await dispatch(loginAction(input));
    login(userData);
    navigate("/dashboard");
  } catch (error) {
    console.log("Error al iniciar sesión", error);
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700" htmlFor="username">
              Username
            </label>
            <input
               // Cambiado de email a username
              name="username" // Cambiado de email a text
              value={input.username} // Cambiado de email a username
              onChange={handlerChange} // Cambiado de email a username
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              value={input.password}
              onChange={handlerChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
