import * as React from "react";
import "./App.css";
import Notification from "./Layout/Notification";
import Event from "./Event/Event";
import ResponsiveDrawer, { Home } from "./ResponsiveDrawer/ResponsiveDrawer";
import { Routes, Route } from "react-router";
import SearchMovie from "./Layout/SearchMovie";
import MovieDetail from "./Layout/SearchMovie/MovieDetail";
import EventDetail from "./EventDetail/EventDetail";
import Login from "./Layout/Auth";
import { useAuth } from "./context/auth-context";
import Auth from "./Layout/Auth";
import AuthGuard from "./Layout/Auth/AuthGuard";
import Register from "./Layout/Auth/Register";
import LoginPage from "./Layout/Auth/LoginPage";
import EventParticipated from "./Event/EventParticipated";
import AddDeleteFriends from "./Friends/AddDeleteFriends";
function App() {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        <Route
          path={"/"}
          element={
            <AuthGuard>
              <ResponsiveDrawer />
            </AuthGuard>
          }
        >
          <Route index element={<Home />} />
          <Route path={"notification"} element={<Notification />} />
          <Route path={"events"} element={<Event />} />
          <Route path={"events/:eventId"} element={<EventDetail />} />
          <Route path={"search"} element={<SearchMovie />} />
          <Route path="search/:imdbId" element={<MovieDetail />} />
          <Route path={"eventsParticipated"} element={<EventParticipated/>}/>
          <Route path={"/friends"} element={<AddDeleteFriends />} />
          {/*TODO Other pages from here*/}
        </Route>
        <Route path={"/auth"} element={<Auth />}>
          <Route index path={"login"} element={<LoginPage />} />
          <Route path={"register"} element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
