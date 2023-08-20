// import "dotenv/config";
import { useState, useEffect } from "react";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(
    function () {
      //   handleCloseMovie();
      //   callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,

            { signal: controller.signal }
          );

          // if (!response.ok) {
          //   console.log("Error condition triggered");
          //   throw new Error(
          //     "An error occurred while trying to fetch the requested data. This could be due to a network issue or a problem with the server."
          //   );
          // }
          const data = await response.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (error) {
          if (error.message === "Failed to fetch")
            error.message =
              "An error occurred while trying to fetch the requested data. This could be due to a network issue or a problem with the server";
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, KEY]
  );

  return { movies, isLoading, error };
}
