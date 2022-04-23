import * as React from "react";
import "./App.css";
import Notification from "./Layout/Notification";
import Event from "./Event/Event";
import ResponsiveDrawer, { Home } from "./ResponsiveDrawer/ResponsiveDrawer";
import { Routes, Route } from "react-router";
import SearchMovie from "./Layout/SearchMovie";
import MovieDetail from "./Layout/SearchMovie/MovieDetail";

function App() {
  return (
    <div className="App">
      <ResponsiveDrawer />
      <Routes>
        <Route path={"/"} element={<ResponsiveDrawer />}>
          <Route index element={<Home />} />
          <Route path={"notification"} element={<Notification />} />
          <Route path={"events"} element={<Event />} />
          <Route path={"search"} element={<SearchMovie />} />
          <Route path="search/:imdbId" element={<MovieDetail />} />
          {/*TODO Other pages from here*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
