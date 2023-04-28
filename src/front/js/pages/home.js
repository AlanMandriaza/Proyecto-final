import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Carrusel1 from "../component/carrusel1";
import Carrusel2 from "../component/carrusel2";
import CardsFront from "../component/cardsFront";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
    <Carrusel1/>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <CardsFront
              imagen="https://i.pinimg.com/236x/12/b7/3d/12b73d64b92860020f9e9a6023f57394.jpg"
              texto="más vendidos"
              stilos="rounded-circle imagen-circulo"
            />
            </div>
            <div className="col-md-4">
            <CardsFront
              imagen="https://i.pinimg.com/564x/18/ba/e3/18bae3a445203fec62ded16796df057b.jpg"
              texto="Temporada  OTOÑO/INVIERNO"
              stilos="rounded-circle imagen-circulo"
            />
            </div>
            <div className="col-md-4">
            <CardsFront
              imagen="https://i.pinimg.com/236x/68/8b/d2/688bd2bfb5282b766fc34f961dcf0783.jpg"
              texto="más vendidos"
              stilos="rounded-circle imagen-circulo"
            />
            </div>
        </div>
      </div>
      <Carrusel2 />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <CardsFront
              imagen="https://i.pinimg.com/236x/38/74/24/387424e1b116252582871bfe5da42f5e.jpg"
              texto="más vendidos"
              stilos="rounded imagen-circulo"
            />
            </div>
            <div className="col-md-3">
            <CardsFront
              imagen="https://i.pinimg.com/564x/83/f6/44/83f644adec4e8c0f553e8eb5e36889a3.jpg"
              texto="Temporada  OTOÑO/INVIERNO"
              stilos="rounded imagen-circulo"
            />
            </div>
            <div className="col-md-3">
            <CardsFront
              imagen="https://i.pinimg.com/564x/8b/98/cf/8b98cf7bbb9a27068ad749a42805083e.jpg"
              texto="más vendidos"
              stilos="rounded imagen-circulo"
            />
            </div>
            <div className="col-md-3">
            <CardsFront
              imagen="https://i.pinimg.com/564x/10/c8/fd/10c8fdbf1b14a53a7226d41abdecf4a9.jpg"
              texto="más vendidos"
              stilos="rounded imagen-circulo"
            />
            </div>
        </div>
      </div>
    </>
  );
};
