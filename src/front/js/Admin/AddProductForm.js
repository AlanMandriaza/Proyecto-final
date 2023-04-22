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
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getCategories().then((categories) => {
      const updatedCategories = categories.map((category) => ({
        ...category,
        key: category.id // Agregar una propiedad 'key' única a cada categoría
      }));
      setCategories(updatedCategories);
    });
  }, []);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addProduct(productData).then((newProduct) => {
      console.log("Producto agregado:", newProduct);
    });
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const existingCategory = categories.find(
        (category) =>
          category.name.toLowerCase() === newCategory.toLowerCase()
      );

      if (existingCategory) {
        setError("La categoría ya existe");
      } else {
        const createdCategory = await api.addCategory(newCategory);
        setCategories([...categories, { ...createdCategory, key: createdCategory.id }]);
        setNewCategory("");
        setError(null);
      }
    } catch (error) {
      setError("Error al agregar la categoría");
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
        {error && <p>{error}</p>}
      </form>
  
  </>
  );
};

export default AddProductForm;
  