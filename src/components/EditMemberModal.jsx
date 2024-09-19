import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyMember } from "../redux/actions/Member";

function EditMemberModal({ isOpen, member, activities, closeModal }) {
  const dispatch = useDispatch();
  const [selectedActivities, setSelectedActivities] = useState(member.activities.map(activity => activity._id));
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber || '');

  const handleActivityChange = (activityId) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(activityId)
        ? prevSelected.filter((id) => id !== activityId)
        : [...prevSelected, activityId]
    );
  };

  const handleSave = async () => {
    const updatedMember = {
      _id: member._id, 
      name,
      email,
      phoneNumber,
      activities: selectedActivities,
      plan: member.plan
    };

    try {
      await dispatch(modifyMember(updatedMember)); 
      alert("Miembro editado correctamente."); 
      closeModal(); 
    } catch (error) {
      console.error("Error al editar el miembro:", error);
      alert("Error al editar el miembro."); 
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
        <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-3xl w-full">
          <h2 className="text-2xl font-semibold mb-4">Editar Miembro</h2>
          <div className="form-control">
            <label className="label">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Número de Celular</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Actividades</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity) => (
                <div key={activity._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={activity._id}
                    checked={selectedActivities.includes(activity._id)}
                    onChange={() => handleActivityChange(activity._id)}
                    className="checkbox checkbox-primary"
                  />
                  <label htmlFor={activity._id} className="ml-2">
                    {activity.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="btn btn-secondary text-white bg-gray-500 hover:bg-gray-600 ml-4"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditMemberModal;
