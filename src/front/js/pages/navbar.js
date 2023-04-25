import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";


const MainNavbar = (props) => {
  const logout = () => {
    console.log("entre a la funcion logout");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const location = useLocation();
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
        <li className="nav-item py-3">
          <Link
            className={
              "nav-link " + (location.pathname === "/calzado" ? "active" : "")
            }
            to="/calzado"
          >
            <span className="navItem">Calzado</span>
          </Link>
        </li>
        <li className="nav-item py-3">
          <Link
            className={
              "nav-link " + (location.pathname === "/sale" ? "active" : "")
            }
            to="/sale"
          >
            <span className="navItem">SALE</span>
          </Link>
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
          <li className="nav-item py-4">
            <span className="navItem">
              <i className="fa-sharp fa-solid fa-magnifying-glass mx-3"></i>
            </span>
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
              <Link className="dropdown-item" href="#" to="/login">
                  Iniciar Sesión
              </Link>
              <Link className="dropdown-item" href="#" to="/register">
                  Registrarse
              </Link>
              <li className="dropdown-item" href="#" onClick={logout}>
                  Cerrar Sesión
              </li>
            </ul>
          </li>
          </div>
        {localStorage.getItem("user") && (
          <p className="bienvenido">Bienvenido, {localStorage.getItem("user")}</p>
        )}
      </ul>
      <Outlet />
    </>
  );
};

export default MainNavbar;
