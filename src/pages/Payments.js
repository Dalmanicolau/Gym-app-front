import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPayments } from "../redux/actions/Payments";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(6); // Cambiado a 6 pagos por página
  const [pagesToShow] = useState(6); // Número máximo de páginas a mostrar
  const dispatch = useDispatch();
  const paymentsList = useSelector((state) => state.payments.payments);

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  useEffect(() => {
    setPayments(paymentsList);
    setFilteredPayments(paymentsList);
  }, [paymentsList]);

  useEffect(() => {
    const filtered = payments.filter(
      (payment) =>
        payment.member?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.activity.some((activity) =>
          activity.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredPayments(filtered);
    setCurrentPage(1); // Resetear a la primera página al cambiar el filtro
  }, [searchTerm, payments]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Lógica para paginación
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  // Determinar el rango de páginas a mostrar
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPages = () => {
    setCurrentPage((prev) => Math.max(prev - pagesToShow, 1));
  };

  const handleNextPages = () => {
    setCurrentPage((prev) => Math.min(prev + pagesToShow, totalPages));
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800">Gestión de Pagos</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar por miembro o actividad"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-lg p-3 w-full max-w-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Miembro</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Plan</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Fecha</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Actividad</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((payment) => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{payment.member?.name}</td>
                  <td className="py-3 px-4 text-gray-700">${payment.amount}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(payment.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {payment.activity.map((activity) => activity.name).join(", ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-gray-500">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {currentPage > pagesToShow && (
              <li>
                <button
                  onClick={handlePrevPages}
                  className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-blue-600 hover:text-white"
                >
                  Anterior
                </button>
              </li>
            )}
            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <li key={startPage + index}>
                <button
                  onClick={() => handlePageChange(startPage + index)}
                  className={`px-4 py-2 border rounded-lg ${currentPage === startPage + index ? "bg-blue-500 text-white" : "bg-white text-gray-700"} hover:bg-blue-600 hover:text-white`}
                >
                  {startPage + index}
                </button>
              </li>
            ))}
            {currentPage < totalPages - pagesToShow + 1 && (
              <li>
                <button
                  onClick={handleNextPages}
                  className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-blue-600 hover:text-white"
                >
                  Siguiente
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Payments;
