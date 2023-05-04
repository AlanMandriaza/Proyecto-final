import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../Admin/Api";
import "../../styles/categoria.css";

const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  
  useEffect(() => {
    let isMounted = true; // agregamos una variable booleana para verificar si el componente está montado o no
    api.getProductsByCategory(categoryId)
      .then((data) => {
        if (isMounted) {
          setProducts(data); // actualizamos el estado solo si el componente está montado
        }
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
    api.getCategoryById(categoryId)
      .then((data) => {
        if (isMounted) {
          setCategory(data); // actualizamos el estado solo si el componente está montado
        }
      })
      .catch((error) => console.error("Error al cargar la categoría:", error));

    return () => {
      isMounted = false; // actualizamos el valor de la variable booleana cuando el componente se desmonta
    };
  }, [categoryId]);

  return (
    <div className="category-container">
      <h2>{category.name}</h2>
      <div className="product-cards-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/productos/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
