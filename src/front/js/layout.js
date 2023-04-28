import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from './Admin/Admin';
import Category from "./component/categorias";
import Correo from "./component/correo";
import { Footer } from "./component/footer";
import Formulario from "./pages/formulario";
import FormularioRegister from "./pages/formularioRegister";
import  Cart  from "./pages/cart";
import { Demo } from "./pages/demo";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import Inventory from "./Admin/Inventory";
import MainNavbar from "./pages/navbar";
import ProductDetails from './component/ProductDetails.jsx';
import ProductosHombre from './pages/productosHombre';
import ProductosMujer from './pages/productosMujer';
import ScrollToTop from "./component/scrollToTop";
import { Single } from "./pages/single";
import Favorites from "./pages/favorite";


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
            <Route element={<Favorites />} path="/favoritos" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Admin />} path="/admin" />
            <Route element={<Inventory />} path="/inventario" />
            <Route element={<ProductosMujer />} path="/mujer" />
            <Route element={<ProductosHombre />} path="/hombre" />
            <Route path="/productos/:id" element={<ProductDetails />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Correo />
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
