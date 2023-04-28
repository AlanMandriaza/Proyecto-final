import React, { useState, useEffect } from "react";
import "../../styles/CustomFormStyles.css";

import api from "./Api";
import { Container, Row, Col } from "reactstrap";
import Alerta from "../component/alert";

const CategoriesForm = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  // const [categorySuccessMsg, setCategorySuccessMsg] = useState(null);
  // const [error, setError] = useState(null);
  const [reloadCategories, setReloadCategories] = useState(false);
  const [statusError, setstatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [texto, setTexto] = React.useState("");

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
        (category) => category.name.toLowerCase() === newCategory.toLowerCase()
      );

      if (existingCategory) {
        setColor("danger");
        setTexto("Este producto ya existe");
        setstatusError(true);
      } else {
        if(!newCategory){
          setColor("danger");
          setTexto("Debe agregar una categoria");
          setstatusError(true);
        }else {
          const createdCategory = await api.addCategory(newCategory);
          setCategories([
            ...categories,
            { ...createdCategory, key: createdCategory.id },
          ]);
          setNewCategory("");
          setColor("primary");
          setTexto("Categoría creada exitosamente");
          setstatusError(true);
          setReloadCategories(!reloadCategories);
        }
        
      }
    } catch (error) {
      setColor("danger");
      setTexto("Error al agregar la categoría");
      setstatusError(true);
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
        setColor("danger");
        setTexto("No se puede eliminar una categoría asociada a un producto");
        setstatusError(true);
      } else {
        const response = await api.deleteCategory(categoryId);

        if (response.success) {
          const updatedCategories = categories.filter(
            (category) => category.id !== categoryId
          );
          setCategories(updatedCategories);
          setColor("primary");
          setTexto("Se elimino Categoría exitosamente");
          setstatusError(true);
        } else {
          setColor("danger");
          setTexto("Error al eliminar la categoría");
          setstatusError(true);
        }
      }
    } catch (error) {
      setColor("danger");
      setTexto("Error al eliminar la categoría");
      setstatusError(true);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 3000); // Establecer el temporizador en 3 segundos (3000 ms)
    }
  };

  return (
    <Container className="d-grid w-50 mb-5">
      {statusError && <Alerta texto={texto} color={color} />}
      <Row>
        <Col>
          <h1 className="text-center mb-3"> Agregar Categoría</h1>
          <form onSubmit={handleNewCategorySubmit} className="custom-form">
            <div className="mb-3">
              <label htmlFor="newCategory" className="form-label">
                Nombre de categoría:
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
          </form>
          <div className="row justify-content-md-center mt-4 mb-4">
            <h4>Categorías</h4>
            <ul className="list-group">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {category.name}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesForm;
