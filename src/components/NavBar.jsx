import React, { useContext } from "react";
import { Navbar, Button, Nav, Badge,Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { StarFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate({ replace: true });

  // grabs totalItems state from our watchList slice (which is in our store)
  const { totalItems } = useSelector((state) => state.watchList)

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary d-flex flex-row align-items-center justify-content-between px-3"
    >
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="d-flex flex-row align-items-center justify-content-between">
        {user.name && (
          <>
            <h6 className="mx-3">User: {user.name}</h6>
            {/* <Button className="mx-2"
              variant="outline-danger"
              onClick={() => navigate("/watch-list")}
            >
              Watch List
            </Button> */}
            <Container onClick={() => navigate("/watch-list")}>
              <StarFill color="gold" />
              <Badge bg="secondary">{totalItems}</Badge>
            </Container>
          </>
        )}
        <Button onClick={() => navigate("login")} variant="outline-success">
          Login
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
