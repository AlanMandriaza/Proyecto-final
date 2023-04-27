import React, { useState, useEffect } from "react";
import "./CustomFormStyles.css";
import api from "./Api";

const CategoriesForm = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [categorySuccessMsg, setCategorySuccessMsg] = useState(null);
  const [error, setError] = useState(null);
  const [reloadCategories, setReloadCategories] = useState(false);

  useEffect(() => {
    api.getCategories().then((categories) => {
      const updatedCategories = categories.map((category) => ({
        ...category,
        key: category.id,
      }));
      setCategories(updatedCategories);
    });
  }, [reloadCategories]);

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const existingCategory = categories.find(
        (category) =>
          category.name.toLowerCase() === newCategory.toLowerCase()
      );

      if (existingCategory) {
        setError("Esta categoría ya existe");
      } else {
        const createdCategory = await api.addCategory(newCategory);
        setCategories([...categories, { ...createdCategory, key: createdCategory.id }]);
        setNewCategory("");
        setCategorySuccessMsg("Categoría creada exitosamente");
        setError(null);
        setReloadCategories(!reloadCategories);
        
      }
    } catch (error) {
      setError("Error al agregar la categoría");
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleCheckCategoryProducts = async (categoryId) => {
    try {
      const products = await api.getProductsByCategory(categoryId);
      return products.length > 0;
    } catch (error) {
        
      throw new Error("Error al obtener productos asociados con la categoría");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const hasProducts = await handleCheckCategoryProducts(categoryId);
  
      if (hasProducts) {
        setError("No se puede eliminar una categoría asociada a un producto");
      } else {
        const response = await api.deleteCategory(categoryId);
  
        if (response.success) {
          const updatedCategories = categories.filter((category) => category.id !== categoryId);
          setCategories(updatedCategories);
        } else {
          setError("Error al eliminar la categoría");
        }
      }
    } catch (error) {
      setError("Error al eliminar la categoría");
    } finally {
      setTimeout(() => {
        setError(null);
      }, 3000); // Establecer el temporizador en 3 segundos (3000 ms)
    }
  };
  

  return (
    <>
      <form onSubmit={handleNewCategorySubmit} className="custom-form">
        <div className="mb-3">
          <label htmlFor="newCategory" className="form-label">
            Agregar categoría:
          </label>
          <input
            type="text"
            id="newCategory"
            name="newCategory"
            value={newCategory}
            onChange={handleNewCategoryChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn custom-btn">
          Agregar categoría
        </button>
        {categorySuccessMsg && <p>{categorySuccessMsg}</p>}
        {error && <p>{error}</p>}
      </form>
      <div className="mt-4">
        <h4>Categorías</h4>
        <ul className="list-group">
          {categories.map((category) => (
            <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
              {category.name}
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(category.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        </div>
    </>
  );
};

export default CategoriesForm;
