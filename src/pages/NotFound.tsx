import React from "react";

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem", background: "#ffe6f0" }}>
      <h2>404 - Página no encontrada 😢</h2>
      <p>Ups... la ruta no existe o está mal escrita.</p>
    </div>
  );
};

export default NotFound;
