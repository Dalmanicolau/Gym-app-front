import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../redux/actions/Payments";

function PaymentModal({ member, closePaymentModal }) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);
  const [customAmount, setCustomAmount] = useState(member?.plan?.price || 0);

  const handlePayment = () => {
    const paymentData = {
      member: member._id,
      amount: parseFloat(customAmount), // Use the custom amount
      activities: member.activities,
    };

    dispatch(addPayment(paymentData));
    closePaymentModal();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    closePaymentModal();
  };

  const memberActivities = member?.activities?.map((activityId) => {
    const activity = activities.find((act) => act._id === activityId);
    return activity ? activity.name : "Actividad desconocida";
  });

  return (
    <div className="modal modal-open">
      <div className="modal-box modal-middle">
        <h3 className="font-bold text-2xl mb-4">Confirmar Pago</h3>

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
          <label
            htmlFor="customAmount"
            className="block text-lg font-bold mb-2"
          >
            Monto a Pagar:
          </label>
          <input
            type="number"
            id="customAmount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="input input-bordered w-full"
            min="0"
            step="0.01"
          />
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary bg-blue-600"
            onClick={handlePayment}
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
