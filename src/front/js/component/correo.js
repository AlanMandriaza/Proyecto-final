import React from "react";
import {Form, Button, Input, InputGroup, Col } from "reactstrap";

import "../../styles/correo.css";

const Correo = (props) => {
  console.log("here");
  const [email, setEmail] = React.useState("");

  const loginHandler = (ev) => {
    ev.preventDefault();
    if (!email) {
      return;
    }

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE from login success ", data);
        setLoggedin(true);
      });
  };

  return (
    <div className="footer mt-auto py-3 text-center color">
      <p className="mt-3 pt-5">
        Ingresa tu correo para recibir Ofertas, Promociones y más!
      </p>
      <Form onSubmit={loginHandler}>
        <Col className="col-md-6 offset-md-3">
          <InputGroup>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Dirección de correo electrónico"
              onChange={(ev) => setUsername(ev.currentTarget.value)}
            />
            <Button>Suscribir</Button>
          </InputGroup>
        </Col>
      </Form>
    </div>
  );
};

export default Correo;
