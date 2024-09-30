import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../redux/actions/Notifications';
import { getMembers } from '../redux/actions/Member';

function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(state => state.notifications);
  const { members } = useSelector(state => state.members);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Cargando notificaciones...</div>;
  }

  const handleSendWhatsApp = (memberId, notificationType) => {
    // Buscar al miembro por el ID
    const memberFound = members.find(m => m._id === memberId);
    if (!memberFound) {
      console.error("Miembro no encontrado");
      return;
    }

    let message = '';
    
    // Diferenciar entre notificación de cumpleaños o de vencimiento de plan
    if (notificationType === 'cumpleaños') {
      // Mensaje de cumpleaños
      message = `¡Hola ${memberFound.name}! 🎉🎂 Nos gustaría desearte un muy feliz cumpleaños desde Phisycal Fitness. ¡Esperamos que tengas un día increíble!`;
    } else {
      // Mensaje de vencimiento de plan
      const expiringDate = new Date(memberFound.plan.expirationDate).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      message = `Hola ${memberFound.name}, ¿cómo estás? Nos comunicamos desde Phisycal Fitness para recordarte que tu plan vence el día ${expiringDate}. ¡Te esperamos nuevamente! Que tengas un lindo día.`;
    }

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = memberFound.cellphone;
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(url, '_blank');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold mb-8 text-gray-800">Notificaciones</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {notifications?.length > 0 ? (
          <ul className="space-y-4">
            {notifications?.map((notification) => {
              // Determinar el tipo de notificación según el título
              const notificationType = notification.title.includes('cumpleaños') ? 'cumpleaños' : 'vencimiento';

              return (
                <li key={notification._id} className="border-b pb-4 last:border-b-0">
                  <p className="text-lg font-semibold text-gray-800">{notification.title}</p>
                  <p className="text-sm text-gray-500">
                    Fecha de notificación: {new Date(notification.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <button 
                    className="mt-2 text-white bg-green-600 hover:bg-green-700 rounded px-4 py-2"
                    onClick={() => handleSendWhatsApp(notification.member, notificationType)}
                  >
                    Enviar WhatsApp
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No hay notificaciones disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
