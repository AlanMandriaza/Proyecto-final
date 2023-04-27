import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { BASE_URL } from "../Admin/Api";

export const Cart = () => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Hacer una solicitud a la API para obtener los datos del carrito
    fetch(`${BASE_URL}/api/cart/17`)
      .then(response => response.json())
      .then(data => {
        setCartItems(data.cart_items);
        setTotal(data.cart_total);
      })
      .catch(error => {
        console.error('Error al obtener los datos del carrito:', error);
      });
  }, []);

  useEffect(() => {
    // Actualizar el total cada vez que se actualiza el estado de cartItems o total
    setTotal(cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0));
  }, [cartItems, total]);

  const handleDecrease = (item) => {
    // Disminuir la cantidad de un producto en el carrito
    const newQuantity = item.quantity - 1;
    if (newQuantity === 0) {
      handleDelete(item.id);
    } else {
      fetch(`${BASE_URL}/api/cart_items/${item.id}`, {
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
    fetch(`${BASE_URL}/api/cart_items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newQuantity })
    })
      .then(response => response.json())
      .then(data => {
        const updatedCartItems = cartItems.map(cartItem => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: newQuantity
            }
          }
          return cartItem;
        });
        setCartItems(updatedCartItems);
        setTotal(data.cart_total);
      })
      .catch(error => {
        console.error('Error al actualizar la cantidad del producto:', error);
      });
  }

  const handleDelete = (itemId) => {
    // Obtener el item que se va a eliminar
    const itemToDelete = cartItems.find(item => item.id === itemId);
    if (itemToDelete) {
      const quantityToDelete = itemToDelete.quantity;
  
      // Obtener la cantidad total del producto en el carrito
      fetch(`${BASE_URL}/api/cart/${itemToDelete.product.id}`)
        .then(response => response.json())
        .then(data => {
          const totalQuantity = data.cart_item ? data.cart_item.quantity : 0;
  
          // Enviar una solicitud DELETE con la cantidad total del producto a eliminar
          fetch(`${BASE_URL}/api/cart_items/${itemToDelete.product.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: totalQuantity })
          })
            .then(response => response.json())
            .then(data => {
              // Restar el precio total del producto eliminado del total del carrito
              setTotal(total - itemToDelete.product.price * quantityToDelete);
  
              // Eliminar los items de carrito del producto
              const updatedCartItems = cartItems.filter(cartItem => cartItem.product.id !== itemToDelete.product.id);
              setCartItems(updatedCartItems);
            })
            .catch(error => {
              console.error('Error al eliminar el producto:', error);
            });
        })
        .catch(error => {
          console.error('Error al obtener la cantidad total del producto en el carrito:', error);
        });
    }
};
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
          
          <button className="btn btn-outline-secondary" onClick={() => handleDecrease(item)}>-</button>
          <span className="mx-2">{item.quantity}</span>
          <button className="btn btn-outline-secondary" onClick={() => handleIncrease(item)}>+</button>
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