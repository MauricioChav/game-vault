//import logo from './logo.svg';
import React, { Component } from "react";

//Components
import "./App.css";

import { Route, HashRouter, Routes } from "react-router-dom";
import { nav_routes } from "./routes";
import ScrollToTop from "./Components/Common/Helpers/ScrollToTop";
import Home from "./Components/Views/Home";
import Login from "./Components/Views/Login-Signup/Login";
import SignUp from "./Components/Views/Login-Signup/SignUp";
import Game from "./Components/Views/Game/Game";
import Reviews from "./Components/Views/Reviews/Reviews";
import ProfileDev from "./Components/Views/ProfileDev/ProfileDev";

import Menu from "./Components/Views/Common/Menu";
import Footer from "./Components/Views/Common/Footer";

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <HashRouter>
        <ScrollToTop />
        <body>
          <Menu />

          <div className="content">
            <Routes>
              <Route exact path={nav_routes.HOME} element={<Home />} />
              <Route path={nav_routes.LOGIN} element={<Login />} />
              <Route path={nav_routes.SIGNUP} element={<SignUp />} />
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

            <p className="App-intro">{this.state.data}</p>

          </div>

          <Footer />
        </body>
      </HashRouter>
    );
  }
}

export default App;
