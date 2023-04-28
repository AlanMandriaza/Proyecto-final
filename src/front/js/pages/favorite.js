import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import api from "../Admin/Api";

const Favorites = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);


  useEffect(() => {
    let isMounted = true;
    api
      .getProductosByGenere("Hombre")
      .then((productos) => {
        if (isMounted) {
          setProductos(productos);
          setProductosFiltrados(productos);
        }
      })
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setProductosFiltrados(
      productos.filter((product) => product.genere === "Hombre")
    );
  }, [productos]);

  return (
    <div className="m-0 p-0 my-2">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-9 container-fluid">
            <div className="row row-cols-xm-1 row-cols-sm-2 row-cols-md-3 g-4">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card" style={{ width: "18rem" }}>
                      <Link
                        to={`/productos/${item.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <img
                          src={item.image}
                          className="card-img-top cart-size"
                          alt={item.name}
                        />
                      </Link>
                      <div className="card-body">
                        <Link
                          to={`/productos/${item.id}`}
                          className="text-decoration-none text-dark"
                        >
                          <h5 className="card-title">{item.name}</h5>
                        </Link>
                        <span className="card-text fs-4">${item.price}</span>
                        <br />
                        <button
                          type="button"
                          className="btn btn-lg w-100 text-light button-color"
                          onClick={() => alert("hola")}
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
    </div>
  );
};

export default Favorites;
