import React, { useState, useEffect } from "react";
import "./CustomFormStyles.css";
import api from "./Api";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    quantity: "",
    genere: "",
  });
  const [productSuccessMsg, setProductSuccessMsg] = useState(null);
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

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
    setError(null);
  
    try {
      const existingProduct = productList.find(
        (product) =>
          product.name.toLowerCase() === productData.name.toLowerCase()
      );
  
      if (existingProduct) {
        setError("Este producto ya existe");
      } else {
        const response = await api.addProduct(productData);
        if (response.success) {
          console.log("Producto agregado:", response.message);
          setProductData({
            name: "",
            description: "",
            category: "",
            price: "",
            image: "",
            quantity: "",
          });
          const newProduct = {
            ...productData,
            id: response.id,
          };
          setProductList([...productList, newProduct]);
          setProductSuccessMsg("Producto creado exitosamente");
        } else {
          setError(response.message);
        }
      }
    } catch (err) {
      setError("Error al agregar el producto");
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="custom-form">
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
          <label htmlFor="genere" className="form-label">
            Género:
          </label>
          <select
            id="genere"
            name="genere"
            value={productData.genere}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Seleccione el género</option>
            <option value="Mujer">Mujer</option>
            <option value="Hombre">Hombre</option>
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
        {error && <p>{error}</p>}
        {productSuccessMsg && <p>{productSuccessMsg}</p>}
      </form>
    </>
  );



};

export default AddProductForm;