import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Carrusel from "../component/carrusel";
import CardsFront from "../component/cardsFront";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
    <Carrusel />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <CardsFront
              imagen="https://m.media-amazon.com/images/I/61Z4jd1Am8L._AC_SL1500_.jpg"
              texto="más vendidos"
              stilos="rounded-circle imagen-circulo"
            />
            </div>
            <div className="col-md-4">
            <CardsFront
              imagen="https://m.media-amazon.com/images/I/61Z4jd1Am8L._AC_SL1500_.jpg"
              texto="Temporada  OTOÑO/INVIERNO"
              stilos="rounded-circle imagen-circulo"
            />
            </div>
            <div className="col-md-4">
            <CardsFront
              imagen="https://m.media-amazon.com/images/I/61Z4jd1Am8L._AC_SL1500_.jpg"
              texto="más vendidos"
              stilos="rounded-circle imagen-circulo"
            />
            </div>
        </div>
      </div>
      <Carrusel />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <CardsFront
              imagen="https://m.media-amazon.com/images/I/61Z4jd1Am8L._AC_SL1500_.jpg"
              texto="más vendidos"
              stilos="rounded imagen-circulo"
            />
            </div>
            <div className="col-md-3">
            <CardsFront
              imagen="https://m.media-amazon.com/images/I/61Z4jd1Am8L._AC_SL1500_.jpg"
              texto="Temporada  OTOÑO/INVIERNO"
              stilos="rounded imagen-circulo"
            />
            </div>
            <div className="col-md-3">
            <CardsFront
              imagen="https://m.media-amazon.com/images/I/61Z4jd1Am8L._AC_SL1500_.jpg"
              texto="más vendidos"
              stilos="rounded imagen-circulo"
            />
            </div>
            <div className="col-md-3">
            <CardsFront
              imagen="https://m.media-amazon.com/images/I/61Z4jd1Am8L._AC_SL1500_.jpg"
              texto="más vendidos"
              stilos="rounded imagen-circulo"
            />
            </div>
        </div>
      </div>
    </>
  );
};
