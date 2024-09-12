import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../redux/actions/Member";
import NewMemberModal from "../components/NewMemberModal";
import PaymentModal from "../components/PaymentModal";
import { renewMemberPlan } from "../redux/actions/Member";
import { FaUser } from "react-icons/fa";

function Members() {
  const dispatch = useDispatch();
  const { members, total } = useSelector((state) => ({
    members: state.members.members,
    total: state.members.total
  }));  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [renewedMember, setRenewedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchMembers(currentPage, itemsPerPage, searchTerm));
  }, [dispatch, currentPage, searchTerm]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleRenewPlan = async () => {
    for (const memberId of selectedMembers) {
      try {
        const renewedMemberData = await dispatch(renewMemberPlan(memberId));
        setRenewedMember(renewedMemberData);
        setIsPaymentModalOpen(true);
        break;
      } catch (error) {
        console.error(
          "Error al renovar plan:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const filteredMembers = members?.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Miembros</h2>
      <div className="p-4 bg-white rounded-lg shadow">
        {/* Barra de búsqueda y botones */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar miembros..."
            className="input rounded-md border-0 w-full max-w-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-4">
            <button
              className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800"
              onClick={handleModalOpen}
            >
              Agregar Miembro
            </button>
            <button
              className={`btn btn-secondary text-white bg-orange-600 hover:bg-orange-700 ${selectedMembers.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleRenewPlan}
              disabled={selectedMembers.length === 0}
            >
              Renovar plan
            </button>
          </div>
        </div>

        {/* Tabla de miembros */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Ingreso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers?.map((member, index) => (
                <tr key={member._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={selectedMembers.includes(member._id)}
                      onChange={() => handleCheckboxChange(member._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <FaUser className="text-gray-600 text-4xl" />
                        )}
                      </div>
                      <div>
                        <div className="text-gray-700 font-semibold">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(member.plan.initDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.activities.map((activity) => activity.name).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>

        {/* Modales */}
        {isModalOpen && <NewMemberModal closeModal={handleModalClose} />}
        {isPaymentModalOpen && renewedMember && (
          <PaymentModal
            member={renewedMember}
            closePaymentModal={() => setIsPaymentModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Members;
