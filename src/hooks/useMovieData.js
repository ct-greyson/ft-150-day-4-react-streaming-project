import { useEffect, useState } from "react";
import axios from "axios";

export const useMovieData = () => {
  // hook to hold onto our movie data in state
  const [movieData, setMovieData] = useState({});

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDA3M2Y5ZTMwNDFhOWZkYzlkYmYyN2RkYzhkYjVhYyIsIm5iZiI6MTcyMjg4NTIwOS4wNTkxOTQsInN1YiI6IjY2NzljNDQwNjdlMmU3MzVlNjRlMTk4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RBKxgqKM_CiQ09dXMGMhAjcz3vzAOI1Hm1pX6opSze4";

  useEffect(() => {
    const fetchData = async () => {
      //gives id between 1 and 1000
      const movieId = Math.ceil(Math.random() * 1000);

      try {
        const response = await
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`
            }
        });
        setMovieData(response.data)
      } catch (error) {
        console.error(error);
      }
      
    };
    fetchData();
  }, []);

  return { movieData };
};
