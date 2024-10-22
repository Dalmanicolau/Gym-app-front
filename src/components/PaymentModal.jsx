import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../redux/actions/Payments";

const PaymentModal = ({ member, closePaymentModal }) => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);
  const [customAmount, setCustomAmount] = useState(member?.plan?.price || 0);
  const [months, setMonths] = useState(1);
  const basePrice = member?.plan?.price || 0;

  useEffect(() => {
    // Update total amount when months change
    setCustomAmount((basePrice * months).toFixed(2));
  }, [months, basePrice]);

  const handlePayment = () => {
    const paymentData = {
      member: member._id,
      amount: parseFloat(customAmount),
      activities: member.activities,
      months: parseInt(months) // Include months in payment data
    };

    dispatch(addPayment(paymentData));
    closePaymentModal();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    closePaymentModal();
  };

  const handleMonthsChange = (e) => {
    const newMonths = parseInt(e.target.value);
    setMonths(newMonths);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
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
          <label htmlFor="months" className="block text-lg font-bold mb-2">
            Cantidad de Meses:
          </label>
          <select
            id="months"
            value={months}
            onChange={handleMonthsChange}
            className="select select-bordered w-full"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'mes' : 'meses'}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="customAmount" className="block text-lg font-bold mb-2">
            Monto a Pagar:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="customAmount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="input input-bordered w-full"
              min="0"
              step="0.01"
            />
            <span className="text-sm text-gray-500">
              (${basePrice} × {months} {months === 1 ? 'mes' : 'meses'})
            </span>
          </div>
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
};

export default PaymentModal;