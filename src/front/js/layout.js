import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import MainNavbar from "./pages/navbar";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Pago } from "./pages/pago";
import { Envios } from "./pages/envios";
import injectContext from "./store/appContext";
import Formulario from "./pages/formulario";
import FormularioRegister from "./pages/formularioRegister";
import Admin from './Admin/Admin';

import Category from "./component/categorias";



import { Footer } from "./component/footer";
import Correo from "./component/correo";
import Inventory from "./Admin/Inventory";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <MainNavbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<Formulario />} path="/login" />
            <Route element={<FormularioRegister />} path="/register" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Admin />} path="/admin" />
            <Route element={<Inventory />} path="/inventario" />
            <Route element={<Pago />} path="/pago" />
            <Route element={<Envios />} path="/envios" />
            <Route element={<h1>Not found!</h1>} />
            <Route path="/category/:categoryId" element={<Category />} />
          </Routes>
          <Correo />
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
