import React, { useState, useEffect } from "react";
import "./CustomFormStyles.css";
import api from "./Api";
import { Container, Row, Col } from "reactstrap";

import Alerta from "../component/alert";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    quantity: "",
  });
 
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusError, setstatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [texto, setTexto] = React.useState("");

  useEffect(() => {
    api.getProducts().then((products) => {
      setProductList(products);
    });
    api.getCategories().then((categories) => {
      const updatedCategories = categories.map((category) => ({
        ...category,
        key: category.id,
      }));
      setCategories(updatedCategories);
    });
  }, []);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existingProduct = productList.find(
        (product) =>
          product.name.toLowerCase() === productData.name.toLowerCase()
      );

      if (existingProduct) {
        setColor("danger");
        setTexto("Este producto ya existe");
        setstatusError(true);
      } else {
        const response = await api.addProduct(productData);
        if (response.product) {
          console.log("Producto agregado:", response.message);
          setProductData({
            name: "",
            description: "",
            category: "",
            price: "",
            image: "",
            quantity: "",
          });
          setProductList([...productList, productData]);
          setColor("primary");
          setTexto("Producto creado exitosamente");
          setstatusError(true);
        } else {
          setColor("danger");
          setTexto("Debes llenar todos los campos");
          setstatusError(true);
        }
      }
    } catch (err) {
      setColor("danger");
      setTexto("Error al agregar el producto");
      setstatusError(true);
    }
  };

  return (
    <Container className="d-grid w-50 mb-5">
      {statusError && <Alerta texto={texto} color={color} />}
      <Row>
        <Col>
          <h1 className="text-center mb-3">Agregar Productos</h1>
          <form onSubmit={handleSubmit} className="custom-form mb-5">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Categoría:
              </label>
              <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category, index) => (
                  <option key={`category-${index}`} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Precio:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen:
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={productData.image}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Cantidad:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn custom-btn">
              Agregar producto
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductForm;
