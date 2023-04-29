import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Pago = () => {
  const { store, actions } = useContext(Context);
  const initialOptions = {
    "client-id": "Aeyq96S4t1YmgVsRrDXazeYfOYkHhsd3J1WWBh19uku2fDVDIaPjID1MMUB_9EiWlkpHdvEiooSNdzMm",
};
  return (
    <>
    
      <div className="row">
        
        <div className="col-6">
        <h3>InformaciÃ³n de contacto</h3>
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
        <div className="paypal" style={{padding:20}}><PayPalScriptProvider options={ initialOptions}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: store.total.toString()
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        console.log(details.payer, "All Payment Details")
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
        </PayPalScriptProvider>
        </div>

          </div>
        
        <div className="col-6" style={{backgroundColor:'#EFEFEF'}}>
        
        </div>
        </div>
      
    </>
  );
}