import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    const baseImg = process.env.REACT_APP_BASEIMGURL;
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img className="movie-img" src={`${baseImg}/${movie.poster_path}`} />
          <div className="movie-date">{movie.release_date}</div>
          <div className="movie-rate">Rating: {movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
      console.log({ query: query });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Avhira Movies</h1>
        <input className="movie-search" placeholder="Search Film ..." onChange={({ target }) => search(target.value)} />
        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
