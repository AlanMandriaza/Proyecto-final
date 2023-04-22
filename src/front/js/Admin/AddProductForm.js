import React, { useState } from 'react';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .addProduct(productData)
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="category">Categoría:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="image">Imagen:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="quantity">Cantidad:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={productData.quantity}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Agregar producto</button>
    </form>
  );
};

export default AddProductForm;
