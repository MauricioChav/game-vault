import React, { useState } from "react";
import Card from "../../Components/Card/Card";
import NotificationCard, {
  NotificationMessage,
} from "../../Components/NotificationCard/NotificationCard";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";
import moment from "moment";

import { useCreateUserMutation } from "../../Api/userEndpoints";

import "./Login-Signup.css";

function SignUp() {
  let navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [alert, setAlert] = useState({});

  //Validate account creation type
  const route = useParams();
  let userType = 0;

  if (route.type === "developer") userType = 1;

  const submitHandler = async (event) => {
    event.preventDefault();

    //Populate data
    const user_type = userType;

    const user_name = event.target.elements.user_name.value;

    //Verify the user_name doesn't have white space
    if (/\s/.test(user_name))
      return setAlert(
        NotificationMessage("error", "The username can't have any white space.")
      );

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

    const email = event.target.elements.email.value;
    const birthday = event.target.elements.birthday.value;

    //Legal name
    let legal_name = "";
    if (userType === 1) legal_name = event.target.elements.legal_name.value;

    try {
      const newUser = await createUser({
        user_type,
        user_name,
        legal_name,
        email,
        password,
        birthday,
      }).unwrap();

      //Register the user in the localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      setAlert(NotificationMessage("success", "Logged in succesfully!"));

      //Redirect to home
      navigate(nav_routes.HOME);

      setAlert(NotificationMessage("success", "User registered succesfully!"));
    } catch (e) {
      if (e.hasOwnProperty("data.message")) {
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

        {userType === 1 && (
          <>
            <label className="fname">Legal Name:</label>
            <input
              type="text"
              id="legal_name"
              name="legal_name"
              required={true}
            />
          </>
        )}

        <label className="fname">Email:</label>
        <input type="email" id="email" name="email" required={true} />

        <label className="fname">Birthday:</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          min="1900-01-01"
          max={moment().format("YYYY-MM-DD")}
          required={true}
        />

        <label className="fname">Password:</label>
        <input type="password" id="password" name="password" required={true} />

        <label className="fname">Confirm Password:</label>
        <input
          type="password"
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
