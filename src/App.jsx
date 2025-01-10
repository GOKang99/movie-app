import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import ScrollContainer from "react-indiana-drag-scroll";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  //서버에서 검색한 영화들 데이터를 가져옴
  const [favorites, setFavorites] = useState([]);
  async function getMovieRequest(s) {
    const url = `http://www.omdbapi.com/?apikey=6bfc4a64&s=${s}`;
    const response = await fetch(url); //omdb 서버에서 데이터를 제이슨으로 받음
    const jsonData = await response.json(); //제이슨문자열을 자바스크립트 객체로 변환
    if (jsonData.Search != null && jsonData.Search.length > 0) {
      setMovies(jsonData.Search);
    }
  }
  //앱 실행시 처음 한번만 실행 []빈 괄호면 처음 한번만 실행
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieLikes = JSON.parse(localStorage.getItem("favorites"));
    if (movieLikes) {
      setFavorites(movieLikes);
    }
  }, []);
  //로컬에 저장하는 함수
  function saveToLocalStorage(items) {
    localStorage.setItem("favorites", JSON.stringify(items));
  }
  //선호작 추가
  function addFavoriteMovie(movie) {
    const isAlreadyFavorite = favorites.some(
      (fm) => fm.imdbID === movie.imdbID
    );

    if (!isAlreadyFavorite) {
      const newFavoriteList = [...favorites, movie];
      setFavorites(newFavoriteList); //update state
      saveToLocalStorage(newFavoriteList);
    } else {
      alert("이미 추가된 영화입니다.");
    }
    
  }
  //선호작 제거
  function removeFavoriteMovie(movie) {
    const newFavoriteList = favorites.filter(
      (fm) => fm.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList); //update state
    saveToLocalStorage(newFavoriteList);
  }
  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center my-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <ScrollContainer className="row scroll-container">
        <MovieList
          addMovie={true}
          movies={movies}
          handleClick={addFavoriteMovie}
        />
      </ScrollContainer>

      <div className="row align-items-center my-4">
        <MovieListHeading heading="내 선호작" />
      </div>

      <ScrollContainer className="row scroll-container">
        <MovieList
          addMovie={false}
          movies={favorites}
          handleClick={removeFavoriteMovie}
        />
      </ScrollContainer>
    </div>
  );
}

export default App;
