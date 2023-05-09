import { TiLocation } from "react-icons/ti";
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

export const Footer = () => (
  <div className="footerColor container-fluid p-4">
    <Row className="footer-row">
      <Col xs="12" md="3" className="footer-col">
        <h4 className="mb-3">
          <TiLocation className="pb-1 fs-3" />
          Ubícanos
        </h4>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9101951360566!2d-70.60974068530153!3d-33.43762258078181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cc77c4319e9b%3A0x8edf28b768c55a90!2sAv.%20Pdte.%20Eduardo%20Frei%20Montalva%2C%20La%20Cisterna%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1sen!2scl!4v1652152677726!5m2!1sen!2scl"
          width="210"
          height="110"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Col>
      <Col xs="12" md="3" className="footer-col">
        <h4>Contacto</h4>
        <ul>
          <li>Preguntas frecuentes</li>
          <li>Despachos</li>
          <li>Retiro en tienda</li>
          <li>Políticas de pago</li>
          <li>Términos y condiciones</li>
          <li>
            <Link to="/info">Saber más...</Link>
          </li>
        </ul>
      </Col>
      <Col xs="12" md="3" className="footer-col">
        <h4>Políticas de privacidad</h4>
        <ul>
          <li>Políticas de privacidad</li>
        </ul>
      </Col>
      <Col xs="12" md="3" className="footer-col">
        <h4>Formas de pago</h4>
        <img
          src="https://surfwear.sooruz.com/webshop/img/paypal-logo.png"
          className="img-fluid rounded mt-4"
        />
      </Col>
    </Row>
  </div>
);
