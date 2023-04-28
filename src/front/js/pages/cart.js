import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";


export const Cart = () => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);


  const handleIncrease = (item) => {
    const index = store.carrito.findIndex((i) => i.id === item.id);
    actions.increaseCartItemQuantity(index);
  };

  // josefa este boton devuelve por consola el total en moneas y todos los items del carro, modificalo para darle funcionalidad al metodo de pago

  const handleCompra = () => {
    const cartItems = store.carrito.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));
    const compra = {
      items: cartItems,
      total: total
    };
    console.log(compra);
  };

  const handleDecrease = (item) => {
    const index = store.carrito.findIndex((i) => i.id === item.id);
    actions.decreaseCartItemQuantity(index);
  };

  const handleDelete = (id) => {
    const index = store.carrito.findIndex((i) => i.id === id);
    actions.removeFromCart(index);
  };

  useEffect(() => {
    const cartTotal = store.carrito.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    setTotal(cartTotal);
  }, [store.carrito]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Carrito de Compras</h3>
        <div className="btn btn-primary" onClick={() => window.history.back()}>
          <i className="fas fa-arrow-left"></i> Continuar Comprando
        </div>
      </div>
      {store.carrito.length > 0 ? (
        <div>
          <div className="d-flex flex-row">
            <div className="p-2 w-50">Producto</div>
            <div className="p-2 w-10">Cantidad</div>
            <div className="p-2 w-20">Precio</div>
            <div className="p-2 w-20"></div>
          </div>
          {store.carrito.map((item, index) => (
            <div key={item.id} className="d-flex flex-row my-3">
              <div className="p-2 w-50 d-flex align-items-center">
                <img src={item.image} width={100} alt={item.name} className="rounded-circle mr-3" />
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">{item.description}</p>
                </div>
              </div>
              <div className="p-2 w-10 d-flex align-items-center">
                <button className="btn btn-outline-secondary" onClick={() => handleDecrease(item)}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-outline-secondary" onClick={() => handleIncrease(item)}>+</button>
              </div>
              <div className="p-2 w-20 d-flex align-items-center">${item.price}</div>
              <div className="p-2 w-20 d-flex align-items-center">
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
          <hr />
          <div className="d-flex flex-row-reverse">
            <div className="p-2">
              <button className="btn btn-primary" onClick={handleCompra}>Comprar</button>

            </div>
            <div className="p-2">
              <strong>Total:</strong> ${total}
            </div>
          </div>
        </div>
      ) : (
        <div>El carrito está vacío</div>
      )}
    </div>
  );

};

export default Cart;