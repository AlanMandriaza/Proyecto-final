import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/envios.css";

export const Envios = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
    
      <div className="row">
        
        <div className="col-6" style={{paddingBottom:30}}>
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

<h3 style={{paddingTop:30}}>Dirección de envío</h3> 
        <div className="row mx-1">
                        <div className="col-6">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" id="nombre" class="form-control"/>
                        </div>
                        <div className="col-6">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" id="apellido" class="form-control"/>
                        </div>
                    </div>
                    <div className="row mx-1">
                        <div className="col-12">
                            <label for="direccion" class="form-label">Dirección (calle y número)</label>
                            <input type="text" id="direccion" class="form-control"/>
                        </div>
                    </div>
                    <div className="row mx-1">
                        <div className="col-12">
                            <label for="dpto" class="form-label">Dpto, casa, oficina, etc (opcional)</label>
                            <input type="text" id="dpto" class="form-control"/>
                        </div>
                    </div>
                    <div className="row mx-1">
                        <div className="col-6">
                            <label for="comuna" class="form-label">Comuna</label>
                            <input type="text" id="comuna" class="form-control"/>
                        </div>
                        <div className="col-6">
                            <label for="telefono" class="form-label">Teléfono</label>
                            <input type="text" id="telefono" class="form-control"/>
                        </div>
                    </div> 
                    <button style={{margin:15}} type="button" class="btn btn-secondary">Continuar con el pago</button>
        

          </div>
        
        <div className="col-6" style={{backgroundColor:'#EFEFEF'}}>
         
        </div>
        </div>
      
    </>
  );
};