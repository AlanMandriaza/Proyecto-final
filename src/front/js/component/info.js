import React from "react";
import { Row, Col } from "reactstrap";

export default function Info() {
  return (
    <div className="container my-4">
     <Row>
      <Col xs="12" md="6">
        <h2>Contacto</h2>
        <ul>
          <li>
            <strong>Teléfono:</strong> +56 2 1234 5678
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a href="mailto:contacto@fauxatelier.com">contacto@fauxatelier.com</a>
          </li>
          <li>
            <strong>Dirección:</strong> Av. Presidente Eduardo Frei Montalva
            8786, La Cisterna, Región Metropolitana
          </li>
        </ul>
      </Col>
      <Col xs="12" md="6">
        <h2>Políticas de seguridad</h2>
        <p>
          En Faux Atelier nos tomamos muy en serio la seguridad de nuestros
          clientes. Por ello, todos los datos que nos proporcionas al momento de
          realizar una compra en nuestro sitio son encriptados y almacenados en
          servidores seguros. Además, utilizamos sistemas de pago confiables
          como PayPal para procesar todas las transacciones. Puedes estar seguro
          de que tus datos están en buenas manos.
        </p>
      </Col>
    </Row>
    <Row>
      <Col xs="12" md="6">
        <h2>Preguntas frecuentes</h2>
        <ul>
          <li>
            <strong>¿Cuánto tarda el envío?</strong> Los envíos nacionales suelen tardar entre 3 y 5 días hábiles en llegar a destino.
          </li>
          <li>
            <strong>¿Cuáles son los métodos de pago aceptados?</strong> Aceptamos transferencias bancarias y PayPal.
          </li>
          <li>
            <strong>¿Cómo puedo hacer seguimiento de mi pedido?</strong> Una vez que tu pedido ha sido despachado, te enviaremos un correo electrónico con un número de seguimiento que podrás utilizar para rastrear tu envío.
          </li>
        </ul>
      </Col>
      <Col xs="12" md="6">
        <h2>Términos y condiciones</h2>
        <p>
          Al utilizar nuestro sitio web y realizar compras a través de él, estás aceptando nuestros términos y condiciones. Nos reservamos el derecho de modificarlos en cualquier momento y sin previo aviso.
        </p>
      </Col>
    </Row>
    <Row>
      <Col xs="12" md="6">
      <h2>Políticas de pago</h2>
        <p>
          Todos los pagos realizados a través de nuestro sitio web son seguros
          y confiables. Utilizamos sistemas de pago reconocidos como PayPal para
          procesar todas las transacciones. Si tienes alguna duda o problema
          con un pago, por favor contáctanos de inmediato.
        </p>
      </Col>
    </Row>
    </div>
  );
}
