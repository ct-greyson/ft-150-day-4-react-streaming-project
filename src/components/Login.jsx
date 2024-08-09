import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // no refresh

    const newUser = { name: username, isLoggedIn: true };

    // .setItem - stores our data in web storage
    // need to save items as key value pairs where the keys are unique
    // values need to be stored as strings so if you are working with objects make sure you use JSON.stringify
    // for this example we are storing our user data in sessionStorage with the unique "user" key.  because it is sessionStorage, we will lose this data if we close our page but NOT if we refresh
    sessionStorage.setItem("user", JSON.stringify(newUser))

    setUser(newUser) //updates user state in our context
    navigate("/") // navigate back to home page
  }

  return (
    <Container fluid className="vh-100 p-0">
      <NavBar />  
      <Row className="h-50 my-auto w-100 justify-content-center">
        <Col xs={9} sm={6}>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter username"
                autoComplete="off"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
