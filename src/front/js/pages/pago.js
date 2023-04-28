import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/pago.css";

export const Pago = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
    
      <div className="row">
        
        <div className="col-6">
        <h3>Información de contacto</h3>
        <div className="row">

    <div className="col-3" style={{paddingTop:18, paddingLeft:25}}>
    <img style={{with: 100, height: 100}} src={"https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-orange.png"} alt="Logo" />
    </div>
    <div className="col-7" style={{paddingTop:5}}>
        <p className="my-3">Fusce tristique tor</p>
        <p className="my-3">Fusce tristique tor</p>
        <p className="my-3">Fusce tristique tor</p>
    </div>
</div>

        <h3>Pago</h3> 
        

          </div>
        
        <div className="col-6" style={{backgroundColor:'#EFEFEF'}}>
         
        </div>
        </div>
      
    </>
  );
};