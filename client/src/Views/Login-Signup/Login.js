import React from "react";
import Card from "../../Components/Card/Card";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import "./Login-Signup.css";

function Login() {
  return (
    <Card className="gray-round-border" width="380px">
      <form className="user-form">
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
