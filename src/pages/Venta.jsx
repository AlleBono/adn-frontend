import React, { useState } from "react";
import { fmt } from "../data/mockData";

const IVA = 0.19;

function QRMock({ label, color, bg }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-2xl p-3 flex items-center justify-center" style={{ background: bg, width: 90, height: 90 }}>
        <svg viewBox="0 0 21 21" width="64" height="64" fill={color}>
          <rect x="1" y="1" width="5" height="5" rx="1"/>
          <rect x="2" y="2" width="3" height="3" fill={bg}/>
          <rect x="15" y="1" width="5" height="5" rx="1"/>
          <rect x="16" y="2" width="3" height="3" fill={bg}/>
          <rect x="1" y="15" width="5" height="5" rx="1"/>
          <rect x="2" y="16" width="3" height="3" fill={bg}/>
          <rect x="8" y="1" width="2" height="2"/>
          <rect x="11" y="1" width="2" height="2"/>
          <rect x="8" y="4" width="2" height="2"/>
          <rect x="11" y="4" width="2" height="2"/>
          <rect x="1" y="8" width="2" height="2"/>
          <rect x="4" y="8" width="2" height="2"/>
          <rect x="8" y="8" width="5" height="5" rx="1"/>
          <rect x="15" y="8" width="2" height="2"/>
          <rect x="18" y="8" width="2" height="2"/>
          <rect x="1" y="11" width="2" height="2"/>
          <rect x="4" y="11" width="2" height="2"/>
          <rect x="15" y="11" width="2" height="2"/>
          <rect x="18" y="11" width="2" height="2"/>
          <rect x="8" y="15" width="2" height="2"/>
          <rect x="11" y="15" width="2" height="2"/>
          <rect x="8" y="18" width="2" height="2"/>
          <rect x="11" y="18" width="2" height="2"/>
          <rect x="15" y="15" width="2" height="2"/>
          <rect x="18" y="18" width="2" height="2"/>
        </svg>
      </div>
      <span className="text-xs font-bold" style={{ color }}>{label}</span>
    </div>
  );
}

export default function Venta({ products }) {
  const [cart, setCart]           = useState([]);
  const [search, setSearch]       = useState("");
  const [payModal, setPayModal]   = useState(false);
  const [payMethod, setPayMethod] = useState("efectivo");
  const [invoice, setInvoice]     = useState(null);

  const subtotal = cart.reduce((s, i) => s + i.precio * i.qty, 0);
  const iva      = subtotal * IVA;
  const total    = subtotal + iva;

  const filtered = products.filter(
    (p) => p.nombre.toLowerCase().includes(search.toLowerCase()) && p.stock > 0
  );

  const addToCart = (p) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      return ex ? prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
  };
  const changeQty = (id, d) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const remove    = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const confirmar = () => {
    setInvoice({ numero: `FAC-${Date.now().toString().slice(-6)}`, fecha: new Date().toLocaleDateString("es-CO"), items: cart, subtotal, iva, total, metodo: payMethod });
    setPayModal(false);
    setCart([]);
  };

  const METHODS = [
    { id: "efectivo",    label: "Efectivo" },
    { id: "bold",        label: "Bold.cash (Tarjeta / PSE)" },
    { id: "bancolombia", label: "QR Bancolombia" },
    { id: "nequi",       label: "QR Nequi" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-gray-900">Nueva Venta</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Productos */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3">Productos</h3>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Buscar producto..." />
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filtered.map((p) => (
              <div key={p.id} onClick={() => addToCart(p)}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{p.nombre}</p>
                  <p className="text-xs text-gray-400">Stock: {p.stock}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: "#FF9500" }}>{fmt(p.precio)}</p>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs mt-1" style={{ background: "#FF9500" }}>+</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrito */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-3">Carrito</h3>
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 py-10">
              <span className="text-5xl">🛒</span>
              <p className="text-sm mt-2">Agrega productos al carrito</p>
            </div>
          ) : (
            <div className="flex-1 space-y-2 overflow-y-auto max-h-64 pr-1">
              {cart.map((i) => (
                <div key={i.id} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{i.nombre}</p>
                    <p className="text-xs text-gray-400">{fmt(i.precio)} c/u</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => changeQty(i.id, -1)} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: "#FF9500" }}>−</button>
                    <span className="text-sm font-bold w-5 text-center">{i.qty}</span>
                    <button onClick={() => changeQty(i.id, 1)}  className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: "#FF9500" }}>+</button>
                  </div>
                  <p className="text-xs font-bold text-gray-900 w-20 text-right">{fmt(i.precio * i.qty)}</p>
                  <button onClick={() => remove(i.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-1 text-sm">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="flex justify-between text-gray-500"><span>IVA (19%)</span><span>{fmt(iva)}</span></div>
            <div className="flex justify-between font-black text-base text-gray-900 pt-1">
              <span>Total</span><span style={{ color: "#FF9500" }}>{fmt(total)}</span>
            </div>
          </div>
          <button disabled={cart.length === 0} onClick={() => setPayModal(true)}
            className="mt-4 w-full py-3 rounded-xl text-white font-bold text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
            style={{ background: "#FF9500" }}>
            Cobrar {cart.length > 0 ? fmt(total) : ""}
          </button>
        </div>
      </div>

      {/* Modal Pago */}
      {payModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-lg text-gray-900">Método de pago</h3>
              <button onClick={() => setPayModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <p className="text-center text-2xl font-black mb-5" style={{ color: "#FF9500" }}>{fmt(total)}</p>
            <div className="space-y-2 mb-4">
              {METHODS.map((m) => (
                <button key={m.id} onClick={() => setPayMethod(m.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-sm font-semibold transition-colors ${payMethod === m.id ? "border-orange-400 bg-orange-50" : "border-gray-200"}`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === m.id ? "border-orange-400" : "border-gray-300"}`}>
                    {payMethod === m.id && <div className="w-2 h-2 rounded-full" style={{ background: "#FF9500" }} />}
                  </div>
                  {m.label}
                </button>
              ))}
            </div>
            {payMethod === "bancolombia" && (
              <div className="flex justify-center mb-4">
                <QRMock label="Bancolombia" color="#FFCC00" bg="#003087" />
              </div>
            )}
            {payMethod === "nequi" && (
              <div className="flex justify-center mb-4">
                <QRMock label="Nequi" color="white" bg="#7B2D8B" />
              </div>
            )}
            {payMethod === "bold" && (
              <div className="bg-gray-50 rounded-xl p-3 mb-4 text-center text-xs text-gray-500">
                <p className="font-bold text-gray-700">Bold.cash</p>
                <p className="mt-1">Redirige al datáfono o link de pago Bold</p>
              </div>
            )}
            <button onClick={confirmar} className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-90" style={{ background: "#FF9500" }}>
              Confirmar pago
            </button>
          </div>
        </div>
      )}

      {/* Modal Factura */}
      {invoice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl" style={{ background: "#FF9500" }}>✓</div>
              <h3 className="font-black text-lg text-gray-900">¡Venta exitosa!</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2 mb-4">
              <div className="flex justify-between font-bold text-gray-700"><span>Factura</span><span>{invoice.numero}</span></div>
              <div className="flex justify-between text-gray-500"><span>Fecha</span><span>{invoice.fecha}</span></div>
              <div className="flex justify-between text-gray-500"><span>Método</span><span className="capitalize">{invoice.metodo}</span></div>
              <hr className="border-gray-200" />
              {invoice.items.map((i) => (
                <div key={i.id} className="flex justify-between text-gray-600">
                  <span>{i.nombre} x{i.qty}</span><span>{fmt(i.precio * i.qty)}</span>
                </div>
              ))}
              <hr className="border-gray-200" />
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{fmt(invoice.subtotal)}</span></div>
              <div className="flex justify-between text-gray-500"><span>IVA 19%</span><span>{fmt(invoice.iva)}</span></div>
              <div className="flex justify-between font-black text-base text-gray-900">
                <span>Total</span><span style={{ color: "#FF9500" }}>{fmt(invoice.total)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setInvoice(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">Cerrar</button>
              <button onClick={() => { alert("PDF generado (simulado)"); setInvoice(null); }}
                className="flex-1 py-2 rounded-xl text-white text-sm font-bold" style={{ background: "#FF9500" }}>
                📄 PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
