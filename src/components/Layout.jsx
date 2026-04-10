import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV = [
  { to: "/dashboard", label: "Dashboard",    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { to: "/inventario", label: "Inventario",  icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { to: "/venta",      label: "Nueva Venta", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" },
];

function SvgIcon({ d, size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  );
}

export default function Layout({ children, onLogout }) {
  const [open, setOpen] = useState(false);

  const Sidebar = () => (
    <div className="flex flex-col h-full w-56" style={{ background: "#FF9500" }}>
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center overflow-hidden">
          <img src="/logo.jpg" alt="ADN" className="w-7 h-7 object-contain" />
        </div>
        <div>
          <p className="font-black text-white text-xl leading-none">ADN</p>
          <p className="text-orange-200 text-xs">App Web Colombia</p>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive ? "bg-white text-orange-500" : "text-white hover:bg-orange-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <SvgIcon d={n.icon} size={18} color={isActive ? "#FF9500" : "white"} />
                {n.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
        >
          <SvgIcon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" size={18} color="white" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F5F5F5" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0 shadow-lg">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="flex shadow-2xl"><Sidebar /></div>
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
          <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setOpen(true)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-gray-700 text-sm hidden md:block">ADN POS</span>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <svg width="18" height="18" fill="none" stroke="#6b7280" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "#FF9500" }}>
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
