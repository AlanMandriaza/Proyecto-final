import React from "react";

const HistorialPedidos = () => {
    return(
        <div className="container">
            <h1>Información sobre envíos</h1>
            <h3>Trabajamos con un servicio de COURIER privado y también la opción de envíos a través de Starken </h3>
            <div className="container-sm" style={{backgroundColor:'#EFEFEF'}}>
                <h2>¿No sabes qué envíos elegir?</h2>
                <p>Si eres de Región Metropolitana tu COURIER es privado</p>
                <p>Si eres de Regiones tu envío será a través de Starken</p>
                <p>Despacho operativo de 08:00 a 21:00</p>
            </div>
        </div>
    )
}

export default HistorialPedidos;