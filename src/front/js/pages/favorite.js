import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddToCart = (item) => {
    actions.addToCart(item);
    handleDelete(item.id)
    handleShow();
  };

  const handleDelete = (id) => {
    const index = store.favorite.findIndex((i) => i.id === id);
    actions.removeFromFavorite(index);
  };

  const calculateTotal = () => {
    let total = 0;
    store.carrito.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Favoritos</h3>
        <div className="btn btn-primary" onClick={() => window.history.back()}>
          <i className="fas fa-arrow-left"></i> Continuar Comprando
        </div>
      </div>
      {store.favorite.length > 0 ? (
        <div>
          <div className="d-flex flex-row">
            <div className="p-2 w-50 text-center">Producto</div>

            <div className="p-2 w-20">Precio</div>
            <div className="p-2 w-20"></div>
          </div>
          <hr />
          {store.favorite.map((item, index) => (
            <div key={item.id} className="d-flex flex-row my-3">
              <div className="p-2 w-50 d-flex align-items-center">
                <img
                  src={item.image}
                  width={100}
                  alt={item.name}
                  className="rounded-circle m-3"
                />
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">{item.description}</p>
                </div>
              </div>
              <div className="p-2 w-20 d-flex align-items-center">
                ${item.price}
              </div>
              <div className="p-2 w-20 d-flex align-items-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  className="btn w-100 text-light button-color mx-3"
                  onClick={() => handleAddToCart(item)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
          <hr />
        </div>
      ) : (
        <div>
          <h1 className="text-center">Favoritos está vacío</h1>
        </div>
      )}
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

export default Cart;
