import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../redux/actions/Member";
import { fetchActivities } from "../redux/actions/Activity";
import PaymentModal from "./PaymentModal";
import { IoMdPersonAdd } from "react-icons/io";

function NewMemberModal({ closeModal }) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [newMember, setNewMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cellphone: "",
    plan: {
      type: "Mensual",
      initDate: "",
    },
    activities: [],
    automaticRenewal: true,
    promotion: false,
  });

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlanChange = (e) => {
    setFormData({
      ...formData,
      plan: {
        ...formData.plan,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleActivityChange = (e) => {
    const { value, checked } = e.target;
    let updatedActivities = [...formData.activities];

    if (checked) {
      updatedActivities.push(value);
    } else {
      updatedActivities = updatedActivities.filter(
        (activity) => activity !== value
      );
    }

    setFormData({ ...formData, activities: updatedActivities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registeredMember = await dispatch(addMember(formData));
      console.log("Miembro registrado:", registeredMember);
      if (registeredMember) {
        setNewMember(registeredMember);
        setIsPaymentModalOpen(true);
      }
    } catch (error) {
      console.error("Error al registrar el miembro", error);
    }
  };

  return (
    <>
      {/* Modal para registrar nuevo miembro */}
      <div className="modal modal-open">
        <div className="modal-box">
          <IoMdPersonAdd className="ml-[45%] h-10 w-10 text-gray-700" />
          <h3 className="font-bold text-lg text-center">
            Registrar Nuevo Miembro
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Teléfono</label>
              <input
                type="text"
                name="cellphone"
                value={formData.cellphone}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Fecha de Inicio del Plan</label>
              <input
                type="date"
                name="initDate"
                value={formData.plan.initDate}
                onChange={handlePlanChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Tipo de Plan</label>
              <select
                name="type"
                value={formData.plan.type}
                onChange={handlePlanChange}
                className="select select-bordered"
              >
                <option value="Mensual">Mensual</option>
                <option value="Semestral">Semestral</option>
              </select>
            </div>

            {/* Checkboxes para seleccionar actividades */}
            <div className="form-control">
              <label className="label">Actividades</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activities.map((activity) => (
                  <div key={activity._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={activity._id}
                      value={activity._id}
                      onChange={handleActivityChange}
                      className="checkbox checkbox-primary"
                    />
                    <label htmlFor={activity._id} className="ml-2">
                      {activity.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary bg-blue-600">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para confirmar el pago */}
      {isPaymentModalOpen && newMember && (
        <PaymentModal
          member={newMember}
          closePaymentModal={() => {
            setIsPaymentModalOpen(false);
            closeModal();
          }}
        />
      )}
    </>
  );
}

export default NewMemberModal;
