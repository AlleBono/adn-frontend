import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Venta from "./pages/Venta";
import { PRODUCTS } from "./data/mockData";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [products, setProducts] = useState(PRODUCTS);

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  return (
    <Layout onLogout={() => setAuth(false)}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard products={products} />} />
        <Route path="/inventario" element={<Inventario products={products} setProducts={setProducts} />} />
        <Route path="/venta" element={<Venta products={products} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}
