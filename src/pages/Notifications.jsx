import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../redux/actions/Notifications';

function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Cargando notificaciones...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error al cargar notificaciones: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold mb-8 text-gray-800">Notificaciones</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification._id} className="border-b pb-4 last:border-b-0">
                <p className="text-lg font-semibold text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  Fecha de notificación: {new Date(notification.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No hay notificaciones disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
