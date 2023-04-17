import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/MainNavbar.jsx";
import Sale from "./pages/Sale.jsx";
import Mujer from "./pages/Mujer.jsx";
import Hombre from "./pages/Hombre.jsx";
import Calzado from "./pages/Calzado.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/home.jsx";
import HistorialPedidos from "./pages/HistorialPedidos.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx"
import Perfil from "./pages/Perfil.jsx"

const Layout = () => {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/calzado" element={<Calzado />}/>
        <Route path="/sale" element={<Sale />}/>
        <Route path="/historialPedidos" element={<HistorialPedidos />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Layout;
