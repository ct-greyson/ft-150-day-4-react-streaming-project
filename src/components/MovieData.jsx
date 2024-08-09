import React, { useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { useMovieData } from "../hooks/useMovieData";
import { useDispatch } from "react-redux";
import { addItem } from "../features/watchListSlice";
import { useQueryClient } from "@tanstack/react-query";

const MovieData = () => {
  
  let { movieData } = useMovieData();
  const queryClient = useQueryClient();

  // get the global state of our "movieSearch" data from our cache 
  const searchData = queryClient.getQueryData(["movieSearch"])

  if (searchData) {   
    movieData = searchData; 
  }

  /* 
  dispatch sends a call to our redux store
  the call consists of an action
  our action determines which reducer function to run
  */
  const dispatch = useDispatch();

  const handleAddWatchList = (movieData) => {
    const movie = {
      id: movieData.id,
      original_title: movieData.original_title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      runtime: movieData.runtime,
      release_date: movieData.release_date,
      popularity: movieData.popularity
    }
    // dispatching our addItem action with our movie as a payload (parameter)
    dispatch(addItem(movie))
  }

  return (
    <Container>
      <Card className="d-flex flex-row p-3 shadow h-100">
        <Card.Img
          className="border rounded h-100 w-auto img-fluid"
          variant="top"
          src={`https://image.tmdb.org/t/p/w185/${movieData.poster_path}`}
        />
        <Card.Body>
          <Card.Title>
            {movieData.original_title}{" "}
          </Card.Title>
          <Card.Text>{movieData.overview}</Card.Text>

          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Runtime: {movieData.runtime} minutes
            </ListGroup.Item>
            <ListGroup.Item>
              Release Date: {movieData.release_date}
            </ListGroup.Item>
            <ListGroup.Item>Popularity: {movieData.popularity}</ListGroup.Item>
          </ListGroup>

          <Card.Link
            className="btn btn-danger mt-3"
            onClick={() => handleAddWatchList(movieData)}
          >
            Add to Watchlist
          </Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieData;
