import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const Cart = () => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Hacer una solicitud a la API para obtener los datos del carrito
    fetch('https://3001-alanmandria-proyectofin-0be2of3ggya.ws-us95.gitpod.io/api/cart/17')
      .then(response => response.json())
      .then(data => {
        setCartItems(data.cart_items);
        setTotal(data.cart_total);
      })
      .catch(error => {
        console.error('Error al obtener los datos del carrito:', error);
      });
  }, []);

  const handleDecrease = (item) => {
    // Disminuir la cantidad de un producto en el carrito
    const newQuantity = item.quantity - 1;
    if (newQuantity === 0) {
      handleDelete(item.id);
    } else {
      fetch(`https://3001-alanmandria-proyectofin-0be2of3ggya.ws-us95.gitpod.io/api/cart_items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      })
        .then(response => response.json())
        .then(data => {
          setCartItems(cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
              cartItem.quantity = newQuantity;
            }
            return cartItem;
          }));
          setTotal(data.cart_total);
        })
        .catch(error => {
          console.error('Error al actualizar la cantidad del producto:', error);
        });
    }
  }
  const handleIncrease = (item) => {
    // Aumentar la cantidad de un producto en el carrito
    const newQuantity = item.quantity + 1;
    fetch(`https://3001-alanmandria-proyectofin-0be2of3ggya.ws-us95.gitpod.io/api/cart_items/${item.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
    })
    .then(response => response.json())
    .then(data => {
        setCartItems(cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                cartItem.quantity = newQuantity;
            }
            return cartItem;
        }));
        setTotal(data.cart_total);
    })
    .catch(error => {
        console.error('Error al actualizar la cantidad del producto:', error);
    });
}

const handleDelete = (itemId) => {
  fetch(`https://3001-alanmandria-proyectofin-0be2of3ggya.ws-us95.gitpod.io/api/cart_items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
      setTotal(data.cart_total);
    })
    .catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
}



  
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Carrito de Compras</h3>
        <div className="btn btn-primary" onClick={() => window.history.back()}>
          <i className="fas fa-arrow-left"></i> Continuar Comprando
        </div>
      </div>
      <div className="d-flex flex-row">
        <div className="p-2 w-50">Producto</div>
        <div className="p-2 w-10">Cantidad</div>
        <div className="p-2 w-20">Precio</div>
        <div className="p-2 w-20"></div>
      </div>
      {cartItems?.map((item, index) => (
        <div key={item.id} className="d-flex flex-row my-3">
          <div className="p-2 w-50 d-flex align-items-center">
            <img src={item.product.image} width={100} alt={item.product.name} className="rounded-circle mr-3" />
            <div>
              <h5 className="mb-1">{item.product.name}</h5>
              <p className="mb-1">{item.product.description}</p>
            </div>
          </div>
          <div className="p-2 w-10 d-flex align-items-center">
            <button className="btn btn-outline-secondary" onClick={() => handleIncrease(item)}>+</button>
            <span className="mx-2">{item.quantity}</span>
            <button className="btn btn-outline-secondary" onClick={() => handleDecrease(item)}>-</button>
          </div>
          <div className="p-2 w-20 d-flex align-items-center">${item.product.price}</div>
          <div className="p-2 w-20 d-flex align-items-center">
            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
          </div>
        </div>
      ))}
      <hr />
      <div className="d-flex flex-row-reverse">
        <div className="p-2">
          <button className="btn btn-primary">Comprar</button>
        </div>
        <div className="p-2">
          <strong>Total:</strong> ${total}
        </div>
      </div>
    </div>
   );
  };
  
  export default Cart;