import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import api from "../Admin/Api";
import "../../styles/categoria.css";
import { Context } from "../store/appContext";

const Category = () => {
  const { store, actions } = useContext(Context);
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  const [showModal, setShowModal] = useState(false);

  const calculateTotal = () => {
    let total = 0;
    store.carrito.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    let isMounted = true; // agregamos una variable booleana para verificar si el componente está montado o no
    api
      .getProductsByCategory(categoryId)
      .then((data) => {
        if (isMounted) {
          setProducts(data); // actualizamos el estado solo si el componente está montado
        }
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
    api
      .getCategoryById(categoryId)
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

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddToCart = (item) => {
    actions.addToCart(item);
    handleShow();
  };

  const AddToFavorites = (item) => {
    console.log("llegue");
    actions.addToFavorite(item);
  };

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
            <button
              type="button"
              className="btn float-end corazon icon-color fs-4"
              onClick={() => AddToFavorites(product)}
            >
              <i className="far fa fa-heart"></i>
            </button>
            <br />
            <button
              type="button"
              className="btn btn-lg w-100 text-light button-color"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado al carrito!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu carrito actual:</p>
          {store.carrito &&
            store.carrito.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-info">
                  <h5 className="cart-item-name">{item.name}</h5>
                  <p className="cart-item-quantity">
                    Cantidad: {item.quantity}
                  </p>
                  <p className="cart-item-price">Precio: {item.price}</p>
                </div>
              </div>
            ))}
          <hr />
          <h5 className="font-weight-bold">Total: ${calculateTotal()}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Seguir comprando
          </Button>
          <Link to="/cart" className="btn btn-primary">
            Ir al carrito
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
