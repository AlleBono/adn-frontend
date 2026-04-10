import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@adn.co");
  const [pass, setPass]   = useState("123456");
  const [err, setErr]     = useState("");

  const handle = (e) => {
    e.preventDefault();
    if (email && pass) onLogin();
    else setErr("Completa todos los campos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#FF9500,#ffb347)" }}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3" style={{ background: "#FF9500" }}>
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">ADN</h1>
          <p className="text-gray-500 text-sm mt-1">POS web para tu negocio</p>
        </div>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Correo electrónico</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="correo@empresa.co"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Contraseña</label>
            <input
              type="password" value={pass} onChange={(e) => setPass(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="••••••••"
            />
          </div>
          {err && <p className="text-red-500 text-xs">{err}</p>}
          <button type="submit" className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity" style={{ background: "#FF9500" }}>
            Iniciar sesión
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">ADN POS © 2025 · Colombia</p>
      </div>
    </div>
  );
}
