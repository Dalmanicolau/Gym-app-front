import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Asumiendo que ya tienes un AuthContext para manejar la autenticación
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext); // user es el usuario logueado
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Intentando cerrar sesión..."); // Verificación
    logout();
    console.log("Navegando a la página de login..."); // Verificación
    navigate('/login'); // Redirigir a la página de login después de desloguear
};

  /*const handleChangePassword = () => {
    navigate('/change-password'); // Redirigir a la página de cambio de contraseña
  };*/

  return (
    <nav className="bg-sky-100 p-1 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold"></div>
        <div className="relative">
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              className="w-10 h-10 rounded-full"
              src={`https://api.dicebear.com/6.x/bottts/svg?seed=${user?.username}`}
              alt="Avatar"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
            
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
