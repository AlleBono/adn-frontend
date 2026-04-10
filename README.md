# ADN POS Colombia

Frontend POS web — React + Vite + TailwindCSS

## Instalación

```bash
npm install
npm run dev
```

## Build producción

```bash
npm run build
```

## Deploy Vercel

El archivo `vercel.json` ya está incluido con rewrite para SPA.

## Estructura

```
src/
  data/mockData.js      # Datos de prueba + formateador COP
  pages/
    Login.jsx
    Dashboard.jsx       # KPIs + Chart.js barras
    Inventario.jsx      # CRUD productos
    Venta.jsx           # Carrito + IVA 19% + QR mock
  components/
    Layout.jsx          # Sidebar naranja + topbar
  App.jsx
  main.jsx
  index.css
```

## Colores
- Naranja principal: `#FF9500`
- Fondo: `#F5F5F5`
- Blanco: `#FFFFFF`
