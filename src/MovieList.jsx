/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const MovieList = ({ movies, onSelectedMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
};

export const Movie = ({ movie, onSelectedMovie, onCloseMovie }) => {
  return (
    <li
      key={movie.imdbID}
      onClick={() => onSelectedMovie(movie.imdbID)}
      style={{ cursor: "pointer" }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default MovieList;
