import React, { useState } from "react";
import { fmt } from "../data/mockData";

export default function Inventario({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState({});
  const [nextId, setNextId] = useState(200);

  const filtered = products.filter(
    (p) => p.nombre.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search)
  );

  const openNew = () => {
    setForm({ sku: `00${nextId}`, nombre: "", stock: "", precio: "", categoria: "General" });
    setModal("new");
  };
  const openEdit = (p) => { setForm({ ...p }); setModal(p); };
  const save = () => {
    if (modal === "new") {
      setProducts((prev) => [...prev, { ...form, id: nextId, stock: +form.stock, precio: +form.precio }]);
      setNextId((n) => n + 1);
    } else {
      setProducts((prev) => prev.map((p) => p.id === modal.id ? { ...form, id: modal.id, stock: +form.stock, precio: +form.precio } : p));
    }
    setModal(null);
  };
  const del = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-gray-900">Inventario</h2>
        <button onClick={openNew} className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full text-white" style={{ background: "#FF9500" }}>
          + Nuevo producto
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Buscar producto o SKU..." />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">SKU</th>
                <th className="text-left px-4 py-3">Producto</th>
                <th className="text-left px-4 py-3">Categoría</th>
                <th className="text-right px-4 py-3">Stock</th>
                <th className="text-right px-4 py-3">Precio</th>
                <th className="text-center px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-orange-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 font-mono">{p.sku}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{p.nombre}</td>
                  <td className="px-4 py-3 text-gray-500">{p.categoria}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">{fmt(p.precio)}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button onClick={() => openEdit(p)} className="text-orange-500 hover:underline text-xs font-semibold">Editar</button>
                    <button onClick={() => del(p.id)} className="text-red-500 hover:underline text-xs font-semibold">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-lg text-gray-900">{modal === "new" ? "Nuevo producto" : "Editar producto"}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3">
              {["sku", "nombre", "stock", "precio", "categoria"].map((f) => (
                <div key={f}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 capitalize">{f}</label>
                  <input value={form[f] || ""} onChange={(e) => setForm((prev) => ({ ...prev, [f]: e.target.value }))}
                    type={["stock", "precio"].includes(f) ? "number" : "text"}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">Cancelar</button>
              <button onClick={save} className="flex-1 py-2 rounded-xl text-white text-sm font-bold" style={{ background: "#FF9500" }}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
