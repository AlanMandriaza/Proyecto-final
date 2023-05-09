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
import Alerta from "./alert";
import "../../styles/formulario.css";
import emailjs from "@emailjs/browser";

const ResetPaswordValidate = (props) => {
  const [codigo, setCodigo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [statusError, setstatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [texto, setTexto] = React.useState("");

  const loginHandler = (ev) => {
    ev.preventDefault();

    if (!codigo || !password || !password2) {
      setColor("danger");
      setTexto("Debes llenar todos los campos");
      setstatusError(true);
      return;
    }

      if (password !== password2) {
        setColor("danger");
        setTexto("Las contraseña deben ser iguales");
        setstatusError(true);
        return;
    } else {

      setColor("primary");
      setTexto("Se modifico su contraseña exitosamente");
      window.location.href = "/login";  

       
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Recuperar Contraseña</h1>
      <Container className="d-grid w-50 mb-5 boderFomulario">
        {statusError && <Alerta texto={texto} color={color} />}
        <Row>
          <Col>
            <CardBody>
              <Form onSubmit={loginHandler}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Codigo
                  </Label>
                  <Input
                    type="codigo"
                    name="codigo"
                    id="codigo"
                    placeholder=""
                    onChange={(ev) => setCodigo(ev.currentTarget.value)}
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
                    placeholder=""
                    onChange={(ev) => setPassword(ev.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">
                    Repita Contraseña
                  </Label>
                  <Input
                    type="password"
                    name="password2"
                    id="examplePassword2"
                    placeholder=""
                    onChange={(ev) => setPassword2(ev.currentTarget.value)}
                  />
                </FormGroup>

                <Button type="submit" className="colorBoton">
                  Enviar
                </Button>
              </Form>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPaswordValidate;
