//import logo from './logo.svg';
import React from "react";

//Components
import "./App.css";

import ScrollToTop from "./Components/Helpers/ScrollToTop";
import AuthVerify from "./Components/Helpers/AuthVerify";

import { Route, Routes } from "react-router-dom";
import { nav_routes } from "./routes";
import Home from "./Views/Home";
import Login from "./Views/Login-Signup/Login";
import SignUp from "./Views/Login-Signup/SignUp";
import Game from "./Views/Game/Game";
import GameEdit from "./Views/Game/GameEdit";
import GameList from "./Views/Game/GameList";
import Reviews from "./Views/Reviews/Reviews";
import ProfileReviewer from "./Views/UserProfile/ProfileReviewer";
import ProfileDev from "./Views/UserProfile/ProfileDev";
import ProfileEdit from "./Views/UserProfile/ProfileEdit";

import Menu from "./Views/Header-Footer/Menu";
import Footer from "./Views/Header-Footer/Footer";

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthVerify />
      <div className="body-div">
        <Menu />

        <div className="content">
          <Routes>
            <Route exact path={nav_routes.HOME} element={<Home />} />
            <Route path={nav_routes.LOGIN} element={<Login />} />
            <Route path={nav_routes.SIGNUP + ":type"} element={<SignUp />} />
            <Route path={nav_routes.GAME + ":short_title/"} element={<Game />} />
            <Route
              path={nav_routes.GAME_EDIT + ":route_title/"}
              element={<GameEdit />}
            />
            <Route
              path={nav_routes.PROFILE_DEV + ":name/games"}
              element={<GameList />}
            />
            <Route path={nav_routes.REVIEWS + ":name/"} element={<Reviews />} />
            <Route
              path={nav_routes.PROFILE_REVIEWER + ":name/"}
              element={<ProfileReviewer />}
            />
            <Route
              path={nav_routes.PROFILE_DEV + ":name/"}
              element={<ProfileDev />}
            />
            <Route
              path={nav_routes.PROFILE_EDIT}
              element={<ProfileEdit />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
