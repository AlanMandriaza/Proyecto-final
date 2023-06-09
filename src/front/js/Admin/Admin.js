import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import Inventory from "./Inventory";

const Admin = () => {
  const [activeView, setActiveView] = useState("addProduct");

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const renderView = () => {
    switch (activeView) {
      case "addProduct":
        return <AddProductForm />;
      case "categories":
        return <AddCategoryForm />;
      case "inventario":
        return <Inventory />;
      default:
        return <AddProductForm />;
    }
  };

  return (
    <div className="container">
      <div className=" row justify-content-md-center">
        {localStorage.getItem("rol") === "Admin" && (
          <div className="btn-group mb-5 ">
            <a
              href="#"
              className={`btn ${
                activeView === "addProduct" ? "btn-primary" : "btn-secondary"
              } btn-left`}
              onClick={() => handleViewChange("addProduct")}
              aria-current="page"
            >
              Producto
            </a>
            <a
              href="#"
              className={`btn ${
                activeView === "categories" ? "btn-primary" : "btn-secondary"
              } btn-left`}
              onClick={() => handleViewChange("categories")}
            >
              Categorías
            </a>
            <a
              href="#"
              className={`btn ${
                activeView === "inventario" ? "btn-primary" : "btn-secondary"
              } btn-left`}
              onClick={() => handleViewChange("inventario")}
            >
              Gestor de inventario
            </a>
          </div>
        )}

        {localStorage.getItem("rol") === "Admin" && renderView()}

        { localStorage.getItem("rol") !== "Admin" && <h1 className="text-center">Usuario no tiene privilegios</h1> }
      </div>
    </div>
  );
};

export default Admin;