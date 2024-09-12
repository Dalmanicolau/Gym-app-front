import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../redux/actions/Payments";


function PaymentModal({ member, closePaymentModal }) {
  const dispatch = useDispatch();

  // Obtener actividades del store
  const activities = useSelector((state) => state.activities.activities);

  const handlePayment = () => {
    const paymentData = {
      member: member._id,
      amount: member.plan.price, // Precio total
      activities: member.activities, // IDs de actividades
    };

    // Despachar la acción para registrar el pago
    dispatch(addPayment(paymentData));
    closePaymentModal(); // Cerrar modal después de confirmar el pago
  };

  // Buscar los nombres de las actividades
  const memberActivities = member?.activities?.map((activityId) => {
    const activity = activities.find((act) => act._id === activityId);
    return activity ? activity.name : "Actividad desconocida";
  });

  return (
    <div className="modal modal-open">
      
      <div className="modal-box">
    
        <h3 className="font-bold text-2xl  mb-4">Confirmar Pago</h3>
        
        <div className="mb-4">
          <p className="text-lg">
            <strong>Nombre: </strong> {member?.name}
          </p>
        </div>
       
        <div className="mb-4">
          <p className="text-lg">
            <strong>Actividades: </strong>
            <span className="badge badge-outline badge-primary ml-1">
              {memberActivities?.join(", ")}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg">
            <strong>Total a Pagar: </strong>
            <span className="text-primary">
              ${member?.plan?.price || "Precio no disponible"}
            </span>
          </p>
        </div>
        
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={closePaymentModal}>
            Cancelar
          </button>
          <button className="btn btn-primary bg-blue-600" onClick={handlePayment}>
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
