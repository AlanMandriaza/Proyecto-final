import React, { useState } from 'react';
import AddProductForm from './AddProductForm';
import AddCategoryForm from './AddCategoryForm';
import Inventory from './Inventory';

const Admin = () => {
  const [activeView, setActiveView] = useState('addProduct');

  const handleViewChange = (view) => {
    setActiveView(view);
  };
  const renderView = () => {
    switch (activeView) {
      case 'addProduct':
        return <AddProductForm />;
      case 'categories':
        return <AddCategoryForm />;
      case 'inventario':  // Cambio de 'categories' a 'inventory'
        return <Inventory />;
      default:
        return <AddProductForm />;
    }
  };
  

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <div className="d-flex mb-3">
        <button
          className={`btn ${activeView === 'addProduct' ? 'btn-primary' : 'btn-secondary'} me-2`}
          onClick={() => handleViewChange('addProduct')}
        >
          Agregar producto
        </button>
        <button
          className={`btn ${activeView === 'categories' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleViewChange('categories')}
        >
          Categorías
        </button>
        <button
          className={`btn ${activeView === 'inventario' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleViewChange('inventario')}
        >
          Gestor de inventario
        </button>
      </div>
      {renderView()}
    </div>
  );
};

export default Admin;
