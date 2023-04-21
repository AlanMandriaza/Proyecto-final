import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const MainNavbar = () => {
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
                "nav-link " +
                (location.pathname === "/cart" ? "active" : "")
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
            <ul className="dropdown-menu">
              <Link to="/login">
                <a className="dropdown-item" href="#">
                  Iniciar Sesión
                </a>
              </Link>

              <Link to="/register">
                <a className="dropdown-item" href="#">
                  Registrarse
                </a>
              </Link>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#">
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </li>
        </div>
        <p className="mt-50px">Bienvenido,Yurbanis Briceño</p>
      </ul>
      <Outlet />
    </>
  );
};

export default MainNavbar;
