//import logo from './logo.svg';
import React, { Component } from "react";

//Components
import "./App.css";

import { Route, HashRouter, Routes } from "react-router-dom";
import { nav_routes } from "./routes";
import ScrollToTop from "./Components/Helpers/ScrollToTop";
import Home from "./Views/Home";
import Login from "./Views/Login-Signup/Login";
import SignUp from "./Views/Login-Signup/SignUp";
import Game from "./Views/Game/Game";
import Reviews from "./Views/Reviews/Reviews";
import ProfileDev from "./Views/ProfileDev/ProfileDev";

import Menu from "./Views/Header-Footer/Menu";
import Footer from "./Views/Header-Footer/Footer";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <ScrollToTop />
        <div className="body-div">
          <Menu />

          <div className="content">
            <Routes>
              <Route exact path={nav_routes.HOME} element={<Home />} />
              <Route path={nav_routes.LOGIN} element={<Login />} />
              <Route path={nav_routes.SIGNUP + ":type"} element={<SignUp />} />
              <Route path={nav_routes.GAME + ":name/"} element={<Game />} />
              <Route
                path={nav_routes.REVIEWS + ":name/"}
                element={<Reviews />}
              />
              <Route
                path={nav_routes.PROFILE_DEV + ":name/"}
                element={<ProfileDev />}
              />
            </Routes>

          </div>

          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
