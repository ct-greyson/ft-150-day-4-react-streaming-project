import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import MovieData from "./MovieData";
import Search from "./Search";

const Home = () => {
  // to access our context we need our useContext hook, and then we specify which context we want to access state from (in this case, we want to access our user state from our UserContext)
  const { user } = useContext(UserContext);

  return (
    <Container fluid>
      <NavBar />
      <Container className="p-3">
        {user.isLoggedIn ? 
        <>
            <h1>Welcome, {user.name}!</h1>
            <MovieData />
            <Search />
        </> 
        : 
        <>
            <h1>Please Log in</h1>
        </>}
      </Container>
    </Container>
  );
};

export default Home;
