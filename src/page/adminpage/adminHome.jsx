// import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminHome = () => {
  // Dữ liệu cho biểu đồ Area Chart
  const areaData = {
    labels: ['Mar 1', 'Mar 3', 'Mar 5', 'Mar 7', 'Mar 9', 'Mar 11', 'Mar 13'],
    datasets: [
      {
        label: 'Sales',
        data: [10000, 20000, 15000, 25000, 30000, 35000, 40000],
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Màu nền
        borderColor: 'rgba(59, 130, 246, 1)', // Màu đường viền
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Dữ liệu cho biểu đồ Bar Chart
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 10000, 15000, 12000, 13000, 15000],
        backgroundColor: 'rgba(34, 197, 94, 1)', // Màu thanh
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Dashboard</p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Primary Card</h3>
          <a href="#" className="text-sm underline">View Details</a>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Warning Card</h3>
          <a href="#" className="text-sm underline">View Details</a>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Success Card</h3>
          <a href="#" className="text-sm underline">View Details</a>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Danger Card</h3>
          <a href="#" className="text-sm underline">View Details</a>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Area Chart Example</h3>
          <Line data={areaData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Bar Chart Example</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
