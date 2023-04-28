import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import api from "../Admin/Api";

const MainNavbar = (props) => {
  const logout = () => {
    console.log("entre a la funcion logout");
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    window.location.href = "/";
  };

  const location = useLocation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .getCategories()
      .then((categories) => setCategories(categories))
      .catch((error) =>
        console.error("Error al obtener las categorías:", error)
      );

    // Obtener la cantidad de productos por categoría
    const promises = categories.map((category) => {
      return api
        .getProductCountByCategory(category.id)
        .then((productCount) => {
          return {
            ...category,
            product_count: productCount,
          };
        })
        .catch((error) =>
          console.error(
            `Error al obtener la cantidad de productos para la categoría ${category.id}:`,
            error
          )
        );
    });
    Promise.all(promises).then((categoriesWithProductCount) =>
      setCategories(categoriesWithProductCount)
    );
  }, []);
  return (
    <>
      <ul className="nav mb-3">
        <li className="nav-item">
          <Link
            className={
              "nav-link " + (location.pathname === "/" ? "active" : "")
            }
            to="/"
          >
            <span className="navItem logoName">
              <img
                className="logo m-1"
                src="https://cdn.discordapp.com/attachments/1095108532875051098/1095455514319659040/20230411_170848_0000.png"
              />
              Faux Atelier
            </span>
          </Link>
        </li>
        <li className="nav-item py-3">
          <Link
            className={
              "nav-link " + (location.pathname === "/mujer" ? "active" : "")
            }
            to="/mujer"
          >
            <span className="navItem">Mujer</span>
          </Link>
        </li>
        <li className="nav-item py-3">
          <Link
            className={
              "nav-link " + (location.pathname === "/hombre" ? "active" : "")
            }
            to="/hombre"
          >
            <span className="navItem">Hombre</span>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle categoria"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categorías
          </a>
          <ul
            className="dropdown-menu scroll-categoria"
            aria-labelledby="navbarDropdown"
          >
            {!!categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <li key={category.id}>
                  <Link
                    className="dropdown-item"
                    to={`/category/${category.id}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <div className="d-inline-flex justify-content-end flex-grow-1">
          <li className="nav-item py-3">
            <Link
              className={
                "nav-link " +
                (location.pathname === "/historialPedidos" ? "active" : "")
              }
              to="/historialPedidos"
            >
              <span className="navItem">
                <i className="fa-solid fa-truck"></i>
              </span>
            </Link>
          </li>
          <li className="nav-item py-3">
            <Link
              className={
                "nav-link " +
                (location.pathname === "/favoritos" ? "active" : "")
              }
              to="/favoritos"
            >
              <span className="navItem">
                <i className="fa-solid fa-heart"></i>
              </span>
            </Link>
          </li>
          <li className="nav-item py-3">
            <Link
              className={
                "nav-link " + (location.pathname === "/cart" ? "active" : "")
              }
              to="/cart"
            >
              <span className="navItem">
                <i className="fa-solid fa-cart-shopping fa-sm"></i>
              </span>
            </Link>
          </li>
          <li className="nav-item dropdown py-3 ">
            <a
              className="nav-link"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user text-light"></i>
            </a>
            <ul className="dropdown-menu ">
              {!localStorage.getItem("user") && (
                <Link className="dropdown-item" href="#" to="/login">
                  Iniciar Sesión
                </Link>
              )}
              {!localStorage.getItem("user") && (
                <Link className="dropdown-item" href="#" to="/register">
                  Registrarse
                </Link>
              )}
              {localStorage.getItem("rol") === "admin" && (
                <Link className="dropdown-item" href="#" to="/admin">
                  Administrador
                </Link>
              )}
              {localStorage.getItem("user") && (
                <li className="dropdown-item" href="#" onClick={logout}>
                  Cerrar Sesión
                </li>
              )}
            </ul>
          </li>
        </div>
        {localStorage.getItem("user") && (
          <p className="bienvenido">
            Bienvenido, {localStorage.getItem("user")}
          </p>
        )}
      </ul>
      <Outlet />
    </>
  );
};

export default MainNavbar;
