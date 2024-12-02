import React from "react";
import Moviesapi from "./components/Moviesapi";
import Favorites from "./Favorites";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* <Route exact path="/Favorites" element={<Favorites />} /> */}
        <Route exact path="/" element={<Moviesapi />} />
      </Routes>
    </>
  );
}

export default App;
