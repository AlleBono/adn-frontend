import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from "chart.js";
import { VENTAS_SEMANA, fmt } from "../data/mockData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = {
  labels: VENTAS_SEMANA.labels,
  datasets: [{
    label: "Ventas COP",
    data: VENTAS_SEMANA.data,
    backgroundColor: "#FF9500",
    borderRadius: 6,
    borderSkipped: false,
  }],
};

const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    y: {
      ticks: { callback: (v) => `$${(v / 1000000).toFixed(1)}M`, font: { size: 10 } },
      grid: { color: "#f3f4f6" },
    },
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
};

function KpiCard({ title, value, sub, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: "#FFF3E0" }}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="text-xs mt-1 text-orange-500">{sub}</p>
    </div>
  );
}

export default function Dashboard({ products }) {
  const lowStock = products.filter((p) => p.stock < 10).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-black text-gray-900">Dashboard</h2>
        <button className="text-xs font-bold px-4 py-2 rounded-full text-white" style={{ background: "#FF9500" }}>
          Compartir dashboard
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="Ventas hoy"       value="$1.250.000 COP" sub="↑ Venta con 700 COP"          icon="🛒" />
        <KpiCard title="Inventario bajo"  value={lowStock}        sub={`${lowStock} ítems con stock bajo`} icon="📦" />
        <KpiCard title="Clientes nuevos"  value="8"               sub="Clientes nuevos hoy"           icon="👤" />
      </div>

      {/* Table + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Productos</h3>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">Con transacción ▾</span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2">SKU</th>
                <th className="text-left pb-2">Producto</th>
                <th className="text-right pb-2">Stock</th>
                <th className="text-right pb-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 6).map((p) => (
                <tr key={p.id} className="border-b border-gray-50">
                  <td className="py-2 text-gray-400 font-mono">{p.sku}</td>
                  <td className="py-2 text-gray-700">{p.nombre}</td>
                  <td className="py-2 text-right text-gray-700">{p.stock}</td>
                  <td className="py-2 text-right font-semibold text-gray-900">COP {p.precio.toLocaleString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Ventas performans</h3>
          <Bar data={chartData} options={chartOptions} />
          <p className="text-center text-xs text-gray-400 mt-2">Ventas semanal</p>
        </div>
      </div>
    </div>
  );
}
