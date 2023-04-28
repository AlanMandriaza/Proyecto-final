import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Admin/Api';
import "../../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    api.getProductById(id)
      .then(product => {
        setProduct(product);
        return api.getCategoryById(product.category_id);
      })
      .then(category => {
        setCategory(category);
      })
      .catch(error => console.error('Error al obtener los detalles del producto:', error));
  }, [id]);

  return (
    <div className="product-details">
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-category">Categoría: {category.name}</p>
        <p className="product-description">Descripción: {product.description}</p>
        <p className="product-genere">Género: {product.genere}</p>
        <p className="product-price">Precio: {product.price}</p>
        <p className="product-quantity">Cantidad disponible: {product.quantity}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
