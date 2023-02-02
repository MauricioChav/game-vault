import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import NotificationCard, {
  NotificationMessage,
} from "../../Components/NotificationCard/NotificationCard";
import { useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";

import moment from "moment";

import {
  useGetOwnUserQuery,
  useUpdateUserMutation,
} from "../../Api/userEndpoints";

function ProfileEdit() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({});
  const [patchUser] = useUpdateUserMutation();
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //Validate if the user is logged in with a developer account (Both conditions should be met)
  useEffect(() => {
    if (loggedUser === null) {
      navigate(nav_routes.HOME);
    }
  }, [loggedUser, navigate]);

  const {
    data: user,
    isError,
    isLoading,
    error,
  } = useGetOwnUserQuery({ token: loggedUser.token });

  const errorContent = (
    <Card className="text-center">
      <h1 className="t-center" style={{ marginTop: "20px" }}>
        Error. User not found!
      </h1>
    </Card>
  );

  if (isError) {
    console.log("Error", error);
    return errorContent;
  } else if (isLoading) {
    return (
      <Card className="text-center">
        <h1>Getting User data...</h1>
      </Card>
    );
  }

  const updateProfileHandler = async (event) => {
    event.preventDefault();

    //Asign data
    const user_name = event.target.elements.user_name.value;

    //Verify the user_name doesn't have white space
    if (/\s/.test(user_name))
      return setAlert(
        NotificationMessage("error", "The username can't have any white space.")
      );

    //Legal name and Image Banner
    let legal_name = "";
    let img_banner = "";
    if (user.user_type === 1) {
      legal_name = event.target.elements.legal_name.value;
      img_banner = event.target.elements.img_banner.value;
    }

    const birthday = event.target.elements.birthday.value;
    const about_me = event.target.elements.about_me.value;
    const img_profile = event.target.elements.img_profile.value;

    try {
      await patchUser({
        data: {
          user_name,
          legal_name,
          birthday,
          about_me,
          img_profile,
          img_banner,
        },
        token: loggedUser.token,
      }).unwrap();

      setAlert(NotificationMessage("success", "User registered succesfully!"));
    } catch (e) {
      if (e.hasOwnProperty("data.message")) {
        setAlert(NotificationMessage("error", e.data.message));
      } else {
        setAlert(
          NotificationMessage("error", "Error. The user could not be edited!")
        );
      }
    }
  };

  //Make a page refresh for the changes to update

  const changePasswordHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <Card>
      <h1>
        <i className="fa-solid fa-gear"></i> &nbsp; Account Settings
      </h1>

      <NotificationCard notification={alert} />

      <form className="large-form" onSubmit={updateProfileHandler}>
        <div className="row fg-space">
          <div className="col-12">
            <h3 className="fg-space">Basic Information</h3>
          </div>

          <div className="col-3">
            <label className="fg-label">Username:</label>
            <br></br>
            <input
              type="text"
              id="user_name"
              name="user_name"
              required
              defaultValue={user.user_name}
            />
          </div>

          {user.user_type === 1 && (
            <div className="col-3">
              <label className="fg-label">Legal Name:</label>
              <input
                type="text"
                id="legal_name"
                name="legal_name"
                required
                defaultValue={user.legal_name}
              />
            </div>
          )}

          <div className="col-3">
            <label className="fg-label">
              {user.user_type === 1 ? "Founded" : "Birthday"}:
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              min="1900-01-01"
              max={moment().format("YYYY-MM-DD")}
              required
              defaultValue={moment(user.birthday).format("YYYY-MM-DD")}
            />
          </div>
        </div>

        <div className="row fg-space">
          <div className="col-12">
            <label className="fg-label">About me</label>
            <textarea
              id="about_me"
              name="about_me"
              defaultValue={user.about_me}
            ></textarea>
          </div>
        </div>

        <div className="row fg-space">
          <div className="col-12">
            <h3 className="fg-space">Images</h3>
          </div>
          <div className="col-6">
            <label className="fg-label">Profile Image:</label>
            <input
              type="text"
              id="img_profile"
              name="img_profile"
              defaultValue={user.img_profile}
            />
          </div>

          {user.user_type === 1 && (
            <div className="col-6">
              <label className="fg-label">Banner Image:</label>
              <input
                type="text"
                id="img_banner"
                name="img_banner"
                defaultValue={user.img_banner}
              />
            </div>
          )}
        </div>

        <button className="submit-btn" type="submit">
          Update Profile
        </button>
      </form>

      <hr style={{ height: "10px" }}></hr>

      <form className="large-form" onSubmit={changePasswordHandler}>
        <div className="row fg-space">
          <div className="col-12">
            <h3 className="fg-space">Change Password</h3>
          </div>
          <div></div>
          <div className="col-6 fg-space">
            <label className="fg-label">Old Password:</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="col-12">
            <div className="row fg-space">
              <div className="col-3">
                <label className="fg-label">New Password:</label>
                <input type="password" id="new_password" name="new_password" />
              </div>
              <div className="col-3">
                <label className="fg-label">Confirm Password:</label>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-danger" type="submit">
          Change Password
        </button>
      </form>
    </Card>
  );
}

export default ProfileEdit;
