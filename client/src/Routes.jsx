import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";

const AppRouter = () => {
  return (
    <Routes>
      {/* Por defecto se inicia en /listadoDeUsuarios */}
      <Route path="/" element={<Navigate to="/listadoDeUsuarios" replace />} />
      <Route path="/usuarios" element={<App />} />
      <Route path="/listadoDeUsuarios" element={<App />} />
    </Routes>
  );
};

export default AppRouter;
