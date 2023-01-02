import React from "react";
import Card from "../../Common/Card/Card";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../../routes";

import "./Login-Signup.css";

function SignUp() {
  return (
    <Card className="gray-round-border" width="380px">
      <form className="user-form">
        <h3 className="form-title">Create an account</h3>
        <label for="fname">Username:</label>
        <input type="text" id="username" name="username" value="" />

        <label for="fname">Email:</label>
        <input type="email" id="email" name="email" value="" />

        <label for="fname">Password:</label>
        <input type="text" id="password" name="password" value="" />

        <label for="fname">Confirm Password:</label>
        <input type="text" id="password_confirm" name="password_confirm" value="" />

        <button className="submit-btn" type="submit">
          Create account
        </button>

        <h6>
          Already have an account?{" "}
          <NavLink to={nav_routes.LOGIN}>Login</NavLink>
        </h6>
      </form>
    </Card>
  );
}

export default SignUp;
