import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container, Spinner, Form, Button } from "react-bootstrap";
import MovieData from "./MovieData";
import { useQueryClient } from "@tanstack/react-query";

const Search = () => {
  const [searchBy, setSearchBy] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    //clears our query to prevent duplicate movie data search bug 
    queryClient.clear();
  },[])

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDA3M2Y5ZTMwNDFhOWZkYzlkYmYyN2RkYzhkYjVhYyIsIm5iZiI6MTcyMjg4NTIwOS4wNTkxOTQsInN1YiI6IjY2NzljNDQwNjdlMmU3MzVlNjRlMTk4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RBKxgqKM_CiQ09dXMGMhAjcz3vzAOI1Hm1pX6opSze4";

  const fetchSearch = async () => {
    const responseSearch = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchBy}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log(responseSearch.data.results[0])

    // grab the first movie from the search results list
    return responseSearch.data.results[0];
  };

  const {
    data: searchedMovie,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movieSearch"], // labels our query so react query can tell if it was called or not
    queryFn: fetchSearch, // function to call the query
    enabled: false, // prevents query from running automatically (can manually call with refetch function)
    retry: 3, // how many times we want to retry the API call if it fails
    
  });

  /*
  const {
    data: searchedMovie,
    refetch,
  } = useQuery({
    queryKey: ["movieSearch"], 
    queryFn: fetchSearch, 
    enabled: false, 
  });

  */

  const handleSubmit = (event) => {
    event.preventDefault();

    // call my react query function
    refetch(); // we have control of when we want to execute our query
  };

  if (isLoading) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Search a movie"
            autoComplete="off"
            value={searchBy}
            onChange={(event) => setSearchBy(event.target.value)}
          />
        </Form.Group>
        <Button className="mb-3" type="submit">Search</Button>
      </Form>
      {/* if (searchedMovie) then render MovieData */}
      {searchedMovie && <MovieData />}
    </Container>
  );
};

export default Search;
