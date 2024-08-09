import React, { useMemo, useState, useCallback } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../features/watchListSlice";

const WatchList = () => {
  const [avgPop, setAvgPop] = useState(0);

  //access global state from redux
  // useSelector lets us access our global state from the redux store
  // need to pass a function in order to access state
  // the state you select is based on the reducers you've set up in store.js
  const { watchList } = useSelector((state) => state.watchList);
  const dispatch = useDispatch();

  const handleDelete = useCallback((id) => {
    dispatch(deleteItem(id));
  },[dispatch]);

  
    const calculateAveragePopularity = useMemo(() => {
      let avg = 0;
      if (watchList.length > 0) {
        // go through each movie, get its popularity value, and then overwrite (map over) the current movie object with just its popularity value
        let popularityList = watchList.map((movie) => movie.popularity);

        for (let p of popularityList) {
          avg += p;
        }

        //avg = avg / popularityList.length;
        avg /= popularityList.length;
      }
      setAvgPop(avg);
    }, [watchList]) // re-runs calculation whenever watchList changes


  return (
    <Container>
      <NavBar />
      <h2>Average Popularity: {avgPop.toFixed(2)}</h2>
      <Row className="p-3">
        {watchList.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.original_title} </Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                <Card.Link
                  className="btn btn-danger mt-3"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// React.memo() skips rerenders if the props being passed to this component haven't changed
export default React.memo(WatchList);
