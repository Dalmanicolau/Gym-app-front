import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, renewMemberPlan } from "../redux/actions/Member";
import { fetchActivities } from "../redux/actions/Activity"; // Acción para traer actividades
import NewMemberModal from "../components/NewMemberModal";
import PaymentModal from "../components/PaymentModal";
import EditMemberModal from "../components/EditMemberModal"; // Importa el modal de edición
import { FaUser } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { RiPassExpiredLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { createSelector } from "reselect"; // Importamos reselect para memoizar
import { deleteMember } from "../redux/actions/Member";

// Creamos un selector memoizado
const selectMembersData = createSelector(
  (state) => state.members.members,
  (state) => state.members.total,
  (state) => state.activities.activities,
  (members, total, activities) => ({
    members,
    total,
    activities,
  })
);

function Members() {
  const dispatch = useDispatch();

  // Aquí utilizamos el selector memoizado en lugar de un selector directo
  const { members, total, activities } = useSelector(selectMembersData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [renewedMember, setRenewedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [selectedMemberToEdit, setSelectedMemberToEdit] = useState(null); // Miembro seleccionado para editar
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);

  useEffect(() => {
    dispatch(fetchMembers(currentPage, itemsPerPage, searchTerm));
    dispatch(fetchActivities()); // Traemos las actividades disponibles desde el backend
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

  const handleEditMember = () => {
    const memberToEdit = members.find(
      (member) => member._id === selectedMembers[0]
    );
    setSelectedMemberToEdit(memberToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedMemberToEdit(null);
    dispatch(fetchMembers(currentPage, itemsPerPage, searchTerm));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const filteredMembers = members?.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMember = async () => {
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDeleteMember = async () => {
    try {
      await dispatch(
        deleteMember(selectedMembers[0], currentPage, itemsPerPage, searchTerm)
      );
      dispatch(fetchMembers(currentPage, itemsPerPage, searchTerm));
      setSelectedMembers([]);
      setIsDeleteConfirmModalOpen(false);
    } catch (error) {
      console.error(
        "Error al eliminar miembro:",
        error.response ? error.response.data : error.message
      );
    }
  };

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
              <IoMdPersonAdd className="text-xl" />
            </button>
            <button
              className={`btn btn-secondary text-white bg-orange-600 hover:bg-orange-700 ${
                selectedMembers.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleRenewPlan}
              disabled={selectedMembers.length === 0}
            >
              <RiPassExpiredLine className="text-xl" />
            </button>
            <button
              className={`btn btn-secondary text-white bg-green-600 hover:bg-green-700 ${
                selectedMembers.length !== 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleEditMember()}
              disabled={selectedMembers.length !== 1} // Solo habilitar si hay un miembro seleccionado
            >
              <FaUserEdit className="text-xl" />
            </button>
            <button
              className={`btn btn-secondary text-white bg-red-600 hover:bg-red-700 ${
                selectedMembers.length !== 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleDeleteMember()}
              disabled={selectedMembers.length !== 1}
            >
              <FaTrashAlt className="text-xl" />
            </button>
          </div>
        </div>

        {/* Tabla de miembros */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Celular
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Ingreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Nacimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimiento del Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actividad
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers?.map((member, index) => (
                <tr
                  key={member._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
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
                            className="h-12 w-12 rounded-full border border-gray-300 object-cover"
                          />
                        ) : (
                          <FaUser className="h-12 w-12 rounded-full border border-gray-300" />
                        )}
                      </div>
                      {member.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.cellphone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(member?.plan.initDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.birthday
                      ? new Date(member.birthday).toLocaleDateString("es-AR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "..."}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.plan && member.plan.expirationDate
                      ? new Date(member.plan.expirationDate).toLocaleDateString(
                          "es-AR",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )
                      : "N/A"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.activities.map((activity, idx) => (
                      <span
                        key={idx}
                        className="px-1 whitespace-nowrap text-sm text-gray-500"
                      >
                        {`${activity.name}${
                          idx < member.activities.length - 1 ? "," : ""
                        }`}
                      </span>
                    ))}
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
      </div>
      {/* Modales */}
      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Confirmar Eliminación
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              ¿Está seguro de que desea eliminar este miembro? Esta acción no se
              puede deshacer.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="btn btn-secondary text-white bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                onClick={() => setIsDeleteConfirmModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                onClick={confirmDeleteMember}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <NewMemberModal isOpen={isModalOpen} closeModal={handleModalClose} />
      )}
      {isPaymentModalOpen && renewedMember && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          member={renewedMember}
          closePaymentModal={() => setIsPaymentModalOpen(false)}
        />
      )}
      {isEditModalOpen && selectedMemberToEdit && (
        <EditMemberModal
          isOpen={isEditModalOpen}
          member={selectedMemberToEdit}
          activities={activities}
          closeModal={handleEditModalClose}
        />
      )}
    </div>
  );
}

export default Members;
