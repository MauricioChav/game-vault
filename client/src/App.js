//import logo from './logo.svg';
import React from "react";

//Components
import "./App.css";

import ScrollToTop from "./Components/Helpers/ScrollToTop";
import AuthVerify from "./Components/Helpers/AuthVerify";

import { Route, HashRouter, Routes } from "react-router-dom";
import { nav_routes } from "./routes";
import Home from "./Views/Home";
import Login from "./Views/Login-Signup/Login";
import SignUp from "./Views/Login-Signup/SignUp";
import Game from "./Views/Game/Game";
import Reviews from "./Views/Reviews/Reviews";
import ProfileDev from "./Views/ProfileDev/ProfileDev";

import { useLogoutUserMutation } from "./Api/apiSlice";

import Menu from "./Views/Header-Footer/Menu";
import Footer from "./Views/Header-Footer/Footer";

function App() {
  const [logoutUser] = useLogoutUserMutation();

  const logOut = async () => {
    console.log("EXECUTE LOG OUT")
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      //Logout on DB works fine, but it is called more times than it is needed
      // const logUser = await logoutUser({
      //   token: user.token
      // }).unwrap();

      // console.log("MESSAGE LOGUSER: " , logUser);

      //Remove from the localStorage
      localStorage.removeItem("user");

      console.log("LOGOUT SUCCESFUL!");
    } catch (e) {
      console.log("AN ERROR OCCURED: " , e);
    }
    
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <AuthVerify logOut={logOut} />
      <div className="body-div">
        <Menu />

        <div className="content">
          <Routes>
            <Route exact path={nav_routes.HOME} element={<Home />} />
            <Route path={nav_routes.LOGIN} element={<Login />} />
            <Route path={nav_routes.SIGNUP + ":type"} element={<SignUp />} />
            <Route path={nav_routes.GAME + ":name/"} element={<Game />} />
            <Route path={nav_routes.REVIEWS + ":name/"} element={<Reviews />} />
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

export default App;
