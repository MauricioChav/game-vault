import React, { useState } from "react";
// import { Buffer } from "buffer";

import Card from "../../Components/Card/Card";
import NotificationCard, {
  NotificationMessage,
} from "../../Components/NotificationCard/NotificationCard";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import { useLoginUserMutation } from "../../Api/apiSlice";

import "./Login-Signup.css";

function Login() {
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
      console.log(localStorage.getItem("user"));

      // const token = logUser.token;
      // console.log(token);
      // const tokenStamp = token.split(".")[1];
      // console.log(tokenStamp);

      // const buff = new Buffer.from(tokenStamp, 'base64');
      // const str = JSON.parse(buff.toString('utf-8'));
      // console.log(str);
      // console.log(str.exp * 1000);
      // console.log(Date.now());

      setAlert(NotificationMessage("success", "Logged in succesfully!"));
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
        <input type="text" id="password" name="password" />

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
