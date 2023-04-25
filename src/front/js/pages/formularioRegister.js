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
  Input
} from "reactstrap";
import Alerta from "../component/alert";
import "../../styles/formularioRegister.css";

const FormularioRegister = (props) => {
  console.log("here");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [statusError, setstatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [texto, setTexto] = React.useState("");
  
  const loginHandler = (ev) => {
    ev.preventDefault();
    if (!username || !password) {
      return;
    }
   
    fetch("https://3001-alanmandria-proyectofin-na0p9oacdmc.ws-us95.gitpod.io/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: password,
        first_name: firstName,
        last_name: lastName
      })
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("RESPONSE from login success ", data);
        if (data.user) {
          setColor("primary")
          setTexto("se creo satisfactoriamente el usuario")
          setstatusError(true);
          localStorage.setItem('user', data.user);
          window.location.href = "/";
        } else {
          console.log(data);
          setColor("danger")
          setTexto("Usuario no creado ")
          setstatusError(true);
        } 
    
      });
     

     //console.log(username, password);
  };

  return (
    <Container className="d-grid w-50 mb-5">
       {statusError && (
        <Alerta texto={texto} color={color} />
      )}
      <Row>
        <Col>
            <CardBody>
              <Form onSubmit={loginHandler}>
                <h1 className="text-center mt-5">Crear cuenta</h1>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Nombre
                  </Label>
                  <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder=""
                    onChange={(ev) => setFirstName(ev.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Apellido
                  </Label>
                  <Input
                    type="text"
                    name="apellido"
                    id="apellido"
                    placeholder=""
                    onChange={(ev) => setLastName(ev.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Correo electronico
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
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
                    placeholder=""
                    onChange={(ev) => setPassword(ev.currentTarget.value)}
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
  );
};

export default FormularioRegister;