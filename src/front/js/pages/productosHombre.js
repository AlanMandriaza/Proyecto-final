import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import api from '../Admin/Api';
import React from 'react';
import "../../styles/modal.css";

const ProductosHombre = () => {
  const { store, actions } = useContext(Context);

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [checkedCategorias, setCheckedCategorias] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api.getProductosByGenere('Hombre')
      .then((productos) => {
        if (isMounted) {
          setProductos(productos);
          setProductosFiltrados(productos);
        }
      })
      .catch((error) => console.error('Error al obtener los productos:', error));

    api.getCategories()
      .then((categorias) => {
        if (isMounted) setCategorias(categorias);
      })
      .catch((error) => console.error('Error al obtener las categorías:', error));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCheckboxChange = (event) => {
    const categoryId = Number(event.target.value);
    if (event.target.checked) {
      setCheckedCategorias([...checkedCategorias, categoryId]);
    } else {
      setCheckedCategorias(checkedCategorias.filter((id) => id !== categoryId));
    }
  };
  const calculateTotal = () => {
    let total = 0;
    store.carrito.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    if (checkedCategorias.length === 0) {
      setProductosFiltrados(productos.filter((product) => product.genere === 'Hombre'));
    } else {
      const filteredProductsByGenere = productos.filter((product) => product.genere === 'Hombre');
      const filteredProducts = filteredProductsByGenere.filter((product) => {
        return checkedCategorias.includes(Number(product.category_id));
      });
      setProductosFiltrados(filteredProducts);
    }
  }, [checkedCategorias, productos]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddToCart = (item) => {
    actions.addToCart(item);
    handleShow();
  };

  return (
    <div className="m-0 p-0 my-2">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-3 border border-success">
            <h3>Productos Hombre</h3>
            <h5>Categorías</h5>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="todasLasCategorias"
                checked={!checkedCategorias.length}
                onChange={() => setCheckedCategorias([])}
              />
              <label className="form-check-label" htmlFor="todasLasCategorias">
                Todas las categorías
              </label>
            </div>
            {categorias.map((categoria) => (
              <div className="form-check mb-2" key={categoria.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={categoria.id}
                  id={`categoria${categoria.id}`}
                  checked={checkedCategorias.includes(Number(categoria.id))}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={`categoria${categoria.id}`}>
                  {categoria.name}
                </label>
              </div>
            ))}
          </div>
          <div className="col-9 border border-primary container-fluid">
            <div className="row row-cols-xm-1 row-cols-sm-2 row-cols-md-3 g-4">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card" style={{ width: '18rem' }}>
                      <Link to={`/productos/${item.id}`} className="text-decoration-none text-dark">
                        <img src={item.image} className="card-img-top" alt={item.name} />
                      </Link>
                      <div className="card-body">
                        <Link to={`/productos/${item.id}`} className="text-decoration-none text-dark">
                          <h5 className="card-title">{item.name}</h5>
                        </Link>
                        <span className="card-text fs-4">${item.price}</span>
                        <span className="card-text float-end icon-color fs-4">
                          <AiOutlineHeart />
                        </span>
                        <br />
                        <button
                          type="button"
                          className="btn btn-lg w-100 text-light button-color"
                          onClick={() => handleAddToCart(item)}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center mt-5">
                  <h4>No hay productos disponibles en esta categoría.</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado al carrito!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu carrito actual:</p>
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

export default ProductosHombre;

