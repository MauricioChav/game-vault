import React from "react";
import Card from "../../Components/Card/Card";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";

import {useCreateUserMutation} from '../../Api/apiSlice';

import "./Login-Signup.css";

function SignUp() {

  const [createUser] = useCreateUserMutation();

  //Validate account creation type
  const route = useParams();
  let userType = 0;

  if(route.type === "company")
  userType = 1;

  const submitHandler = (event) =>{
    event.preventDefault();

    //Populate data
    const user_type = userType;
    const user_name = event.target.elements.user_name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const password_confirm = event.target.password_confirm.value;

    createUser({
      user_type,
      user_name,
      email,
      password
    });

    //console.log(user_type, user_name, email, password, password_confirm);
  }

  return (
    <Card className="gray-round-border" width="380px">
      <form className="user-form" onSubmit={submitHandler}>

        <h3 className="form-title">Create an account</h3>
        <label for="fname">Username:</label>
        <input type="text" id="user_name" name="user_name" required={true}/>

        <label for="fname">Email:</label>
        <input type="email" id="email" name="email" required={true}/>

        <label for="fname">Password:</label>
        <input type="text" id="password" name="password" required={true}/>

        <label for="fname">Confirm Password:</label>
        <input type="text" id="password_confirm" name="password_confirm" required={true}/>

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
