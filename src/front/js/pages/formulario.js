import React from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Alerta from "../component/alert";
import { Link } from "react-router-dom";

import "../../styles/formulario.css";

const Formulario = (props) => {
  console.log("here");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [statusError, setstatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [texto, setTexto] = React.useState("");

  const roles = (rol) => {
    
    fetch(
      `https://3001-alanmandria-proyectofin-na0p9oacdmc.ws-us96.gitpod.io/api/users/roles/${rol}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {

        if (data[0].name) {
          localStorage.setItem("rol", data[0].name);
        } else {
          console.log(data);
        }
      });
  }

  const loginHandler = (ev) => {
    ev.preventDefault();

    if (!username || !password) {
      setColor("danger");
      setTexto("Debes llenar todos los campos");
      setstatusError(true);
      return
    }

    fetch(
      "https://3001-alanmandria-proyectofin-na0p9oacdmc.ws-us96.gitpod.io/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE from login success ", data);

        if (data.access_token) {
          roles(data.id)
          setColor("primary");
          setTexto("usuario correcto");
          setstatusError(true);
          localStorage.setItem("user", data.user);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          console.log(data);
          setColor("danger");
          setTexto("Clave o usuario incorrecto");
          setstatusError(true);
        }
      });

    // console.log(username, password);
  };

  return (
    <>
      <h1 className="text-center mt-5">Ingresar</h1>
      <Container className="d-grid w-50 mb-5 boderFomulario">
        {statusError && <Alerta texto={texto} color={color} />}
        <Row>
          <Col>
            <CardBody>
              <Form onSubmit={loginHandler}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Correo electronico
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="ejemplo@ejemplo.com"
                    onChange={(ev) => setUsername(ev.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">
                    Contraseña
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Contraseña"
                    onChange={(ev) => setPassword(ev.currentTarget.value)}
                  />
                </FormGroup>
                <p className="text-center mt-3">¿Olvidó su contraseña?</p>
                <Button type="submit" className="colorBoton">
                  Ingresar
                </Button>
                <Link className="text-center mt-5" to="/register">
                  <p>Crear cuenta</p>
                </Link>
              </Form>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Formulario;
