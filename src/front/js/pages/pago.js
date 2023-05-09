import React, { useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import  Cart  from "./cart";
import emailjs from '@emailjs/browser'; //*



export const Pago = () => {
  const { store, actions } = useContext(Context);
  const form = useRef();
  const initialOptions = {
    "client-id": "Aeyq96S4t1YmgVsRrDXazeYfOYkHhsd3J1WWBh19uku2fDVDIaPjID1MMUB_9EiWlkpHdvEiooSNdzMm",
};
  return (
    <>
    
      <div className="row">
        
        <div className="col-6">
        <h3>Informacion de pago</h3>
        
        <div className="row">

    <div className="col-3" style={{paddingTop:18, paddingLeft:25}}>
    <img style={{with: 100, height: 100}} src={"https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-orange.png"} alt="Logo" />
    </div>
    <div className="col-7" style={{paddingTop:5}}>
    <h3>Total a Pagar:{store.total} </h3>
    </div>
</div>

        <h3>Seleccione metodo de pago</h3> 
        <div className="paypal" style={{padding:20}}><PayPalScriptProvider options={ initialOptions}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: store.total>=0&&store.total.toString(),
                                },
                            },
                        ],
                    });
                }}
                onError={(e)=>{
                    console.log("ERROR!!", e)
                }}
                onApprove={(data, actions) => {

                        //
                        emailjs.sendForm('service_d9rw2d5', 'template_mj51dn6', form.current, 'pE_JtfB9WsOtbVAXI')
                        .then((result) => {
                            console.log(result.text);
                        }, (error) => {
                            console.log(error.text);
                        });
                        //
                    return actions.order.capture().then((details) => {
                        console.log(details.payer, "All Payment Details")
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }
                
            }
        
            />
        </PayPalScriptProvider>
        </div>

          </div>
        
        <div className="col-6" style={{backgroundColor:'#EFEFEF'}}>
        <Cart />
        </div>

        <form ref={form} style={{display:"none"}}>
      <label>Name</label>
      <input type="text" name="user_name" value={"nombre de la persona"} />
      <label>Email</label>
      <input type="email" name="user_email"  value='fauxatelier1@gmail.com'/>
      <label>Message</label>
      <textarea name="message"  value={`Pago aprobado por el monto de : ${store.total}`} />
      <input type="submit" value="Send" />
    </form>
        </div>
      
    </>
  );
};
export default Pago;