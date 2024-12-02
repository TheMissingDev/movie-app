import React, { useEffect, useState } from "react";

// Api Key -> 9249bbd8
// Api Address -> http://www.omdbapi.com/?apikey=[yourkey]&

const Movies = (props) => {
  // States
  const [movies, setMovies] = useState([]);
  const [dta, setData] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [FavMovies, setFavMovies] = useState([]);
  const [hasMore, setHasMore] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoader, setFetchLoader] = useState(false);
  // const [isAlreadyFav, setIsAlreadyFav] = useState(false);
  // const [favClick , setFavClick] = useState(false)

  // Variables
  const Apikey = "9249bbd8";
  const Api = ` http://www.omdbapi.com/?s=${
    props.query
  }&apikey=${Apikey}&page=${props.pageNumber}&type=${
    props.isGame == true ? "game" : "movie"
  }`;
  let data;
  // Calling FetchMovies function from api
  useEffect(() => {
    setFetchLoader(true);
    setTimeout(() => {
      if (props.query !== "") {
        FetchMovies();
        props.setIsFetched(true);
      }
      props.setIsClicked(false);
      setFetchLoader(false);
    }, 2500);
  }, [props.pageNumber, props.clicked]);


  //  Fetching Movies from api
  const FetchMovies = async () => {
    if (props.isFav !== true) {
      try {
        const response = await fetch(Api);
        if (response.status === 200) {
          data = await response.json();
          // console.log(data);
          setData(data);
          props.pageNumber == 1
            ? setMovies(data.Search)
            : setMovies((prev) => [...prev, ...data.Search]);
        } else {
          throw "error fetching movies";
        }
      } catch (error) {
        return "Something went wrong";
      }
    } else {
      return;
    }
  };
  // Infinite Scrolling

  useEffect(() => {
    hasMore == true && props.setPageNumber((prev) => prev + 1);
    props.isFav == true && setFetchLoader(false);
  }, [hasMore == true && hasMore !== false]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setTimeout(() => {
          data && data.totalResults > data.Search.length
            ? setHasMore(true)
            : setHasMore(false);
          setLoading(false);
        }, 1200);
        // loading == true && changePage();
      } else {
        // setLoading(false);
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    props.isFav == false &&
      window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [props.isFav]);

  const handleClear = (index) => {
    const UpFav = FavMovies.filter((_, ind) => ind !== index);
    props.setIsAdded(false);
    setFavMovies(UpFav);
  };
  if (isFilled == true) {
    setTimeout(() => {
      setIsFilled(false);
    }, 1500);
  }
  const handleFavClick = (data, index) => {
    const isAlreadyFav = FavMovies.some((dat) => dat.imdbID == data.imdbID);
    //  index == index && isAlreadyFav == false ? [...FavMovies, data] : return || [];
    let FavMov = [];
    if (index == index && isAlreadyFav == false) {
      FavMov = [...FavMovies, data];
      //  props.setIsAlreadyFav(false)
    } else {
      props.setIsAlreadyFav(true);
      return;
    }
    props.setIsAdded(true);
    setFavMovies(FavMov);
    if (isFilled == false) {
      setIsFilled(true);
    }
  };
  return (
    <>
      {loading == true && (
        <img id="upSpinner" src="./spinner.svg" alt="spinner.svg" />
      )}
      {(props.isFav == false && hasMore == "") || hasMore == true ? (
        fetchLoader == true && dta.length <= 0 ? (
          <img id="spinner-svg" src="./spinner.svg" alt="spinner.svg" />
        ) : dta.Error !== "Movie not found!" && dta.Response == "True" ? (
          movies.map((dat, index) => (
            <div key={index} className="card">
              <div className="img">
                <img src={dat.Poster} alt="poster.img" />
                <span
                  onClick={() => handleFavClick(dat, index)}
                  id={`fav-icon${isFilled == true ? "-fill" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#fff"
                  >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                  </svg>
                </span>
              </div>
              <div className="title-year">
                <h2 className="movieName">{dat.Title}</h2>
                <h3 className="movieYear">{dat.Year}</h3>
              </div>
            </div>
          ))
        ) : (
          <h2 className="noMovieTex">No Movies Found</h2>
        )
      ) : props.isFav == true ? (
        FavMovies.length !== 0 && Array.isArray(FavMovies) ? (
          FavMovies.map((el, index) => (
            <div key={index} className="card">
              <div className="img">
                <img src={el.Poster} alt="poster.img" />
                <span
                  onClick={() => handleClear(index)}
                  id="close-icon"
                >
                  <svg
                  id="close"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#fff"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </span>
              </div>
              <div className="title-year">
                <h2 className="movieName">{el.Title}</h2>
                <h3 className="movieYear">{el.Year}</h3>
              </div>
            </div>
          ))
        ) : (
          <h2 id="noFav-tex">No favorite movies...</h2>
          
        )
      ) : (
        ""
      )}
    </>
  );
};
export default Movies;
