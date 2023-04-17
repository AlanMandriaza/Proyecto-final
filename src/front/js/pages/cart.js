import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

//React fragment es lo mismo que un <> </> una etiqueta vacía que envuelve mucha información @josefa
export const Cart = () => {
  //utilizo context para traerme la información desde store, que en este caso son los items del carrito de compras
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      store.cart.reduce((acumulador, objeto) => {
        return acumulador + (objeto.precio*objeto.cantidad);
      }, 0)
    );
  }, [total]);
  return (
    <React.Fragment>
      <div className="container">
        {store.cart?.map((item, index) => {
          return (
            <>
              <div key={index} className="row ">
                <div className="col-4 d-flex m-2">
                  <img src={item.img} width={100} />
                  <p>
                    {item.nombre} {item.cantidad} ${item.precio}
                  </p>
                </div>
              </div>
              <hr></hr>
            </>
          );
        })}
        <h2>Total {total}</h2>
      </div>
    </React.Fragment>
  );
};
