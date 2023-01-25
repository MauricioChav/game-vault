import React, { useState } from "react";
// import { Buffer } from "buffer";

import Card from "../../Components/Card/Card";
import NotificationCard, {
  NotificationMessage,
} from "../../Components/NotificationCard/NotificationCard";
import { NavLink, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";

import { useLoginUserMutation } from "../../Api/userEndpoints";

import "./Login-Signup.css";

function Login() {
  let navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [alert, setAlert] = useState({});

  const loginHandler = async (event) => {
    event.preventDefault();

    //Populate data
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const logUser = await loginUser({
        email,
        password,
      }).unwrap();

      //Register the user in the localStorage
      localStorage.setItem("user", JSON.stringify(logUser));
      setAlert(NotificationMessage("success", "Logged in succesfully!"));

      //Redirect to home
      navigate(nav_routes.HOME);
    } catch (e) {
      if (e.hasOwnProperty("data.message")) {
        setAlert(NotificationMessage("error", e.data.message));
      } else {
        setAlert(NotificationMessage("error", "Error. Login attempt failed!"));
      }
    }
  };

  return (
    <Card className="gray-round-border" width="380px">
      <NotificationCard notification={alert} />

      <form className="user-form" onSubmit={loginHandler}>
        <h3 className="form-title">Log into your account</h3>
        <label className="fname">Email:</label>
        <input type="email" id="email" name="email" />

        <label className="fname">Password:</label>
        <input type="password" id="password" name="password" />

        <button className="submit-btn" type="submit">
          Log in
        </button>

        <h6>Not registered yet? Create an account</h6>
        <ul>
          <li>
            <NavLink to={nav_routes.SIGNUP + "reviewer"}>
              Create a reviewer account
            </NavLink>
          </li>
          <li>
            <NavLink to={nav_routes.SIGNUP + "company"}>
              Create a company account
            </NavLink>
          </li>
        </ul>
      </form>
    </Card>
  );
}

export default Login;
