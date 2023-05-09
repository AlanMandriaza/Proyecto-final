import React from "react";
import { BASE_URL } from "../Admin/Api";

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
import "../../styles/formularioRegister.css";

const PerfilUser = (props) => {
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  
  const [statusError, setstatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [texto, setTexto] = React.useState("");

  const loginHandler = (ev) => {
    ev.preventDefault();
    if (!country || !city || !address || !phone_number) {
      setColor("danger");
      setTexto("Debes llenar todos los campos");
      setstatusError(true);
      return;
    }

    fetch(`${BASE_URL}/api/users/${localStorage.getItem("userID")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
	      city: city,
        country: country,
        phone_number: phone_number
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setColor("primary");
          setTexto("se Actualizo satisfactoriamente el usuario");
          setstatusError(true);
          window.location.href = "/";
        } else {
          console.log(data);
          setColor("danger");
          setTexto("Usuario no Actualizado");
          setstatusError(true);
        }
      });

  };

  return (
    <>
      <h1 className="text-center mt-5">Perfil de usuario</h1>
      <Container className="d-grid w-50 mb-5 boderFomulario">
        {statusError && <Alerta texto={texto} color={color} />}
        <Row>
          <Col>
            <CardBody>
              <Form onSubmit={loginHandler}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Usuario
                  </Label>
                  <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder={localStorage.getItem("user")}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Pais
                  </Label>{" "}
                  <Input id="contry" name="contry" type="select" onChange={(ev) => setCountry(ev.currentTarget.value)}>
                    <option>Seleccione</option>
                    <option>Argentina</option>
                    <option>Chile</option>
                    <option>Colombia</option>
                    <option>Panama</option>
                    <option>Peru</option>
                    <option>Venezuela</option>
                  </Input>
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Ciudad
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder=""
                    onChange={(ev) => setCity(ev.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Direccion
                  </Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder=""
                    onChange={(ev) => setAddress(ev.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Telefono
                  </Label>
                  <Input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder=""
                    onChange={(ev) => setPhone_number(ev.currentTarget.value)}
                  />
                </FormGroup>
                
                <Button type="submit" className="colorBoton mt-3">
                  Crear
                </Button>
              </Form>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PerfilUser;