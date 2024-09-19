import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../redux/actions/Activity'; // Asegúrate de importar la acción correctamente
import { GiStrongMan } from "react-icons/gi";

function Activities() {
  // Obtener las actividades desde el estado global
  const activities = useSelector((state) => state.activities.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    // Despachar la acción para obtener actividades
    dispatch(fetchActivities());
  }, [dispatch]);

  // Función para traducir las categorías
  const translateCategory = (category) => {
    switch (category) {
      case "class":
        return "Clase";
      case "musculacion":
        return "Musculación";
      default:
        return category; // Si se añade alguna otra categoría en el futuro
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 ml-4">Actividades</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities?.map((activity, index) => (
          <div
            key={activity.id}
            className={`${
              index % 6 < 3 ? "bg-blue-400 text-blue-800" : "bg-orange-400 text-orange-800"
            } rounded-lg shadow-md overflow-hidden`}
          >
            <h2 className="text-2xl font-semibold mb-2 p-4">
              {activity.name}
            </h2>
            <div className="p-4">
              {/* Se traduce la categoría utilizando la función */}
              <p className="mb-1"><strong>Categoría:</strong> {translateCategory(activity.category)}</p>
              <p><strong>Precio:</strong> {activity.price}</p>
            </div>
            <GiStrongMan className='justify-end ml-[80%] mb-1 w-20 h-20'/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
