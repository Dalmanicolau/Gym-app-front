import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardData } from "../redux/actions/Dashboard";
import { BarChart } from '@mui/x-charts';
import { FaPeopleGroup, FaMoneyBillTrendUp } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RiPassExpiredFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const {
    membersCount,
    totalIncome,
    membersPerMonth,
    activityByIncome,
    notifications,
    sportsByMembers,
    table, // Tabla de miembros por mes
    incomeByMonth, // Ingresos por mes
    expiringMembersCount,
    totalActivity,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  console.log('acc', incomeByMonth);

  // Función para agrupar datos por actividad
  const groupByActivity = (data, key) => {
    const grouped = data.reduce((acc, item) => {
      const activityName = item.sport.name;
      if (!acc[activityName]) {
        acc[activityName] = { value: 0, label: activityName };
      }
      acc[activityName].value += item[key]; // Sumar ingresos o miembros según la clave
      return acc;
    }, {});

    return Object.values(grouped); // Convertir el objeto en un array
  };

  // Agrupar ingresos por actividad
  const incomeData = groupByActivity(activityByIncome, 'income');
  
  // Agrupar miembros por deporte
  const membersData = groupByActivity(sportsByMembers, 'members');

  // Nombres de los meses
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Dataset para el gráfico de barras
  const barChartData = months.map((month, index) => ({
    month,
    members: table[index] || 0,
    income: incomeByMonth[index] || 0, // Usar los ingresos por mes correctos del dashboard
  }));

  const valueFormatter = (value) => `$${value}`;

  // Datos para el gráfico de pastel de Ingresos por Actividad
  const incomeChartData = {
    labels: incomeData.map(item => item.label),
    datasets: [
      {
        data: incomeData.map(item => item.value),
        backgroundColor: ['#1d4ed8', '#ea580c', '#60a5fa', '#fb923c', '#1e3a8a', '#fde047'], // Colores ajustados según la paleta
        hoverOffset: 4,
      },
    ],
  };

  // Datos para el gráfico de pastel de Miembros por Deporte
  const membersChartData = {
    labels: membersData.map(item => item.label),
    datasets: [
      {
        data: membersData.map(item => item.value),
        backgroundColor: ['#1d4ed8', '#ea580c', '#0284c7', '#92400e', '#38bdf8', '#fbbf24'], // Colores ajustados según la paleta
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {user ? `¡Hola ${user.username}, bienvenido de vuelta!` : 'Hola, bienvenido de vuelta!'}
      </h1>
      
      {/* Información general */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Tarjeta de Miembros */}
        <div className="p-6 text-center bg-white rounded-lg shadow-lg">
          <FaPeopleGroup className="w-16 h-16 text-blue-600 mx-auto mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-800">Miembros</h2>
          <p className="mt-2 text-xl font-bold text-gray-700">{membersCount}</p>
        </div>
        
        {/* Tarjeta de Pagos */}
        <div className="p-6 text-center bg-white rounded-lg shadow-lg">
          <FaMoneyBillTrendUp className="w-16 h-16 text-orange-500 mx-auto mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-800">Pagos</h2>
          <p className="mt-2 text-xl font-bold text-gray-700">Reciente: ${totalIncome}</p>
        </div>
        
        {/* Tarjeta de Actividades */}
        <div className="p-6 text-center bg-white rounded-lg shadow-lg">
          <CgGym className="w-16 h-16 text-green-600 mx-auto mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-800">Actividades</h2>
          <p className="mt-2 text-xl font-bold text-gray-700">{totalActivity}</p>
        </div>
        
        {/* Tarjeta de Planes por Vencer */}
        <div className="p-6 text-center bg-white rounded-lg shadow-lg">
          <RiPassExpiredFill className="w-16 h-16 text-yellow-500 mx-auto mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-800">Planes por Vencer</h2>
          <p className="mt-2 text-xl font-bold text-gray-700">{expiringMembersCount}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {/* Gráfico de Ingresos por Actividad */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Ingresos por Actividad</h2>
          <Pie data={incomeChartData} width={350} height={350} />
        </div>

        {/* Gráfico de Miembros por Deporte */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Miembros por Deporte</h2>
          <Pie data={membersChartData} width={350} height={350} />
        </div>

        {/* Gráfico de Ingresos y Miembros por Mes */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Ingresos y Miembros por Mes</h2>
          <BarChart
            className="p-2"
            dataset={barChartData}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'members', label: 'Miembros', color: '#1d4ed8' }, // Azul primario
              { dataKey: 'income', label: 'Ingresos', color: '#ea580c', valueFormatter }, // Naranja secundario
            ]}
            width={400}
            height={300}
          />
        </div>
      </div>      
    </div>
  );
}

export default Dashboard;
