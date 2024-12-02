import React, { useEffect, useState } from "react";
import Movies from "./Movies";
import { Link } from "react-router-dom";

const Moviesapi = () => {
  const [query, setQuery] = useState("");
  const [clicked, setIsClicked] = useState(false);
  const [fetched, setIsFetched] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isAdded, setIsAdded] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  // const [isMovies, setIsMovies] = useState(true);
  const [isGame, setIsGame] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isAlreadyFav, setIsAlreadyFav] = useState(false);
  const [FavMovies, setFavMovies] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };
  setTimeout(() => {
    setIsAdded();
    setIsAlreadyFav(false)
  }, 4500);
  const handleHome = () => {
    if (isHome == false) {
      setIsFav(false);
      setIsGame(false);
      setIsHome(true);
    } else if (isHome == true) {
      return setIsHome(false);
    }
  };
  const handleGame = () => {
    if (isGame == false) {
      setIsFav(false);
      setIsHome(false);
      setIsGame(true);
    } else if (isGame == true) {
      return setIsGame(false);
    }
  };
  const handleFav = () => {
    if (isFav == false) {
      setIsFav(true);
      setIsGame(false);
      setIsHome(false);
    } else if (isFav == true) {
      return setIsFav(false);
    }
  };
  return (
    <>
      <nav>
        <input type="checkbox" id="toggle-menu" />
        <div className="hamburger-menu"></div>

        <ul className="menu">
          <li id="tex-Game" className="tex-Nav" onClick={() => handleGame()}>
            Games
          </li>
          <li id="tex-Movie" className="tex-Nav" onClick={() => handleHome()}>
            Home
          </li>
          <li
            id="tex-Favorites"
            className="tex-Nav"
            onClick={() => handleFav()}
          >
            Favourites
          </li>
        </ul>
      </nav>

      <div className="header">
        <div
          className={`alert${
            isAdded == true
              ? "-added"
              : isAdded == false
              ? "-removed"
              : isAlreadyFav == true
              ? "-alreadyFav"
              : ""
          }`}
        >
          {isAlreadyFav == false && <span id="alert-icon" className="material-symbols-outlined">
            check
          </span>}
          <h3 id="alert-text">
            {(isAdded == true && isAlreadyFav == false) ||
            (isAdded == null && isAlreadyFav == false)
              ? "Successfully Added To Favorites"
              : isAdded == false
              ? "Successfully Removed From Favorites"
              : isAlreadyFav == true && isAdded !== true
              ? "It Is Already In Your Favorites"
              : ""}
          </h3>
        </div>
        <h1 id="headerText">{`${
          isGame == true
            ? "Games"
            : isFav == true
            ? "Favorite Movies/Game"
            : "Movies"
        }`}</h1>
        {isFav == false ? (
          <div className="input">
            <input
              type="text"
              id="movieSearch"
              placeholder={`${
                isGame == false ? "Avengers..." : "Marvel's Spider Man 2018..."
              }`}
              value={query}
              onChange={(e) => handleChange(e)}
            />
            <span
              id="icon-search"
              onClick={() => {
                setIsClicked(true);
                if (query !== "") {
                  setIsFetched(true);
                }
              }}
              className="material-symbols-outlined"
            >
              search
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="main">
        {/* if no data is seached (no movies are fetched) */}
        {isFav == false && fetched == false ? (
          <h2 id="searchCon">
            Search Some {`${isGame == true ? "Games..." : "Movies..."}`}
            <span id="main-icon" className="material-symbols-outlined">
              search
            </span>
          </h2>
        ) : isFav == true && fetched == false ? (
          <h2 id="noFav-tex">No favorite movies...</h2>
        ) : (
          ""
        )}
        {fetched == true && (
          <Movies
            query={query}
            clicked={clicked}
            setIsClicked={setIsClicked}
            setIsFetched={setIsFetched}
            isFav={isFav}
            setIsAdded={setIsAdded}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            isGame={isGame}
            setIsAlreadyFav={setIsAlreadyFav}
            FavMovies={FavMovies}
            setFavMovies={setFavMovies}
          />
        )}
      </div>
    </>
  );
};

export default Moviesapi;
