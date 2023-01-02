import React from "react";
import Card from "../../Common/Card/Card";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../../routes";

import "./Login-Signup.css";

function Login() {
  return (
    <Card className="gray-round-border" width="380px">
      <form className="user-form">
        <h3 className="form-title">Log into your account</h3>
        <label for="fname">Username:</label>
        <input type="text" id="username" name="username" value="" />

        <label for="fname">Password:</label>
        <input type="text" id="password" name="password" value="" />

        <button className="submit-btn" type="submit">
          Log in
        </button>

        <h6>Not registered yet? Create an account</h6>
        <ul>
          <li>
            <NavLink to={nav_routes.SIGNUP}>Create a reviewer account</NavLink>
          </li>
          <li>
            <NavLink to={nav_routes.SIGNUP}>Create a company account</NavLink>
          </li>
        </ul>
      </form>
    </Card>
  );
}

export default Login;
