import React, { useState, useEffect } from 'react';
import api from './Api';

const AddProductForm = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        image: '',
        quantity: 0,
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.getCategories()
            .then((response) => {
                setCategories(response);
            })
            .catch((error) => {
                console.error('Error al obtener las categorías:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        api.addProduct(productData)
            .then((response) => {
                console.log('Producto agregado con éxito:', response);
                setProductData({
                    name: '',
                    description: '',
                    category: '',
                    price: 0,
                    image: '',
                    quantity: 0,
                });
            })
            .catch((error) => {
                console.error('Error al agregar el producto:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    return (
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
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
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
      );
    
};

export default AddProductForm;
