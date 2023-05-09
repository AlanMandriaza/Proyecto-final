import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';
import api from '../Admin/Api';
import "../../styles/ProductDetails.css";
import "../../styles/modal.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  const [product, setProduct] = useState({});
  const [category, setCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddToCart = () => {
    actions.addToCart(product);
    handleShow();
  };

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

  useEffect(() => {
    api.getProductsByCategory(id)
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => console.error( error));
  }, [id]);
  const AddToFavorites = (item) => {
    actions.addToFavorite(item);
  };


  return (
    <div className="product-details">
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-category">Categoría: {category ? category.name : 'Cargando...'}</p>
        <p className="product-description">Descripción: {product.description}</p>
        <p className="product-genere">Género: {product.genere}</p>
        <p className="product-price">Precio: {product.price}</p>
        <p className="product-quantity">Cantidad disponible: {product.quantity}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>Agregar al carrito</button>
        <button
          type="button"
          className="btn float-end corazon icon-color fs-4"
          onClick={() => AddToFavorites(product)}
        >
          <i className="far fa fa-heart"></i>
        </button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Producto agregado al carrito</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>El siguiente producto se ha agregado al carrito:</p>
            {store.carrito && store.carrito.map((item, index) => (
              <div key={index} className="cart-item">
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h5 className="cart-item-name">{item.name}</h5>
                  <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                  <p className="cart-item-price">Precio: {item.price}</p>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default ProductDetails;
