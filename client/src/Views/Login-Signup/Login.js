import React, { useState } from "react";
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
        data: {
          email,
          password,
        },
      }).unwrap();

      //Register cookie
      document.cookie = `apitoken=${logUser.token}; max-age=${
        60 * 3
      }; path=/; samesite=strict`;
      console.log(document.cookie);
      let str = document.cookie;
      str = str.slice(str.indexOf("apitoken="));
      console.log("TOKEN IS: " + str);

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
