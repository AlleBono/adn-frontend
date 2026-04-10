export const PRODUCTS = [
  { id: 1, sku: "000001", nombre: "Producto Semanal", stock: 15, precio: 120000, categoria: "General" },
  { id: 2, sku: "000022", nombre: "Producto 1",       stock: 15, precio: 250000, categoria: "General" },
  { id: 3, sku: "000033", nombre: "Producto 2",       stock: 15, precio: 120000, categoria: "General" },
  { id: 4, sku: "000054", nombre: "Producto 3",       stock: 8,  precio: 120000, categoria: "General" },
  { id: 5, sku: "000055", nombre: "Producto 4",       stock: 20, precio: 230000, categoria: "General" },
  { id: 6, sku: "000065", nombre: "Producto 5",       stock: 3,  precio: 130000, categoria: "General" },
  { id: 7, sku: "000053", nombre: "Producto 6",       stock: 12, precio: 100000, categoria: "General" },
];

export const VENTAS_SEMANA = {
  labels: ["Sáb", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Sol"],
  data:   [3200000, 5800000, 4200000, 7600000, 8200000, 6100000, 4800000, 2900000],
};

export const fmt = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", minimumFractionDigits: 0,
  }).format(n);
