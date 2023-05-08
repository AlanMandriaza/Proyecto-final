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

const ResetPasword = (props) => {
  const [email, setEmail] = React.useState("");
  const [statusError, setstatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [texto, setTexto] = React.useState("");

  const loginHandler = (ev) => {
    ev.preventDefault();

    if (!email) {
      setColor("danger");
      setTexto("Debes llenar todos los campos");
      setstatusError(true);
      return;
    } else {

      emailjs
        .send(
          "service_diy27wn",
          "template_icemefj",
          {
            to_email: email,
            to_codigo: 'AZ24rf52RE',
          },
          "HY3C-e2Cf3aB3OMl1"
        )
        .then(
          (result) => {
            setColor("primary");
            setTexto("usuario correcto");
            console.log(result.text);
            window.location.href = "/validePasword";
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Recuperar cuenta</h1>
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
                    onChange={(ev) => setEmail(ev.currentTarget.value)}
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

export default ResetPasword;
