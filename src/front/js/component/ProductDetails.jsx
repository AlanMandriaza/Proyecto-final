import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Admin/Api';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    api.getProductById(id)
      .then(product => setProduct(product))
      .catch(error => console.error('Error al obtener los detalles del producto:', error));
  }, [id]);

  return (
    <div className="product-details">
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-category">Categoría: {product.category}</p>
        <p className="product-description">Descripción: {product.description}</p>
        <p className="product-genere">Género: {product.genere}</p>
        <p className="product-price">Precio: {product.price}</p>
        <p className="product-quantity">Cantidad disponible: {product.quantity}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
