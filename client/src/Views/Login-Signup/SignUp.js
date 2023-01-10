import React, { useState } from "react";
import Card from "../../Components/Card/Card";
import NotificationCard, {
  NotificationMessage,
} from "../../Components/NotificationCard/NotificationCard";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";

import { useCreateUserMutation } from "../../Api/apiSlice";

import "./Login-Signup.css";

function SignUp() {
  const [alert, setAlert] = useState({});

  const [createUser] = useCreateUserMutation();

  //Validate account creation type
  const route = useParams();
  let userType = 0;

  if (route.type === "company") userType = 1;

  const submitHandler = async (event) => {
    event.preventDefault();

    //Populate data
    const user_type = userType;

    const password = event.target.elements.password.value;
    const password_confirm = event.target.password_confirm.value;

    //Verify password
    if (password !== password_confirm)
      return setAlert(
        NotificationMessage(
          "error",
          "Please verify that the passwords fields are the same"
        )
      );

    const user_name = event.target.elements.user_name.value;
    const email = event.target.elements.email.value;

    try {
      await createUser({
        user_type,
        user_name,
        email,
        password,
      }).unwrap();

      setAlert(NotificationMessage("success", "User registered succesfully!"));
    } catch (e) {
      if (e.data.message !== undefined) {
        setAlert(NotificationMessage("error", e.data.message));
      } else {
        setAlert(
          NotificationMessage(
            "error",
            "Error. The user could not be registered!"
          )
        );
      }
    }
  };

  return (
    <Card className="gray-round-border" width="380px">
      <NotificationCard notification={alert} />

      <form className="user-form" onSubmit={submitHandler}>
        <h3 className="form-title">Create a {route.type} account</h3>
        <label className="fname">Username:</label>
        <input type="text" id="user_name" name="user_name" required={true} />

        <label className="fname">Email:</label>
        <input type="email" id="email" name="email" required={true} />

        <label className="fname">Password:</label>
        <input type="text" id="password" name="password" required={true} />

        <label className="fname">Confirm Password:</label>
        <input
          type="text"
          id="password_confirm"
          name="password_confirm"
          required={true}
        />

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
