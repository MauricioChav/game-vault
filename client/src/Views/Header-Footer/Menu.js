import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";

import ProfilePicture from "../../Components/ProfilePicture/ProfilePicture";

import { useLogoutUserMutation } from "../../Api/apiSlice";

import "../../App.css";

function Menu() {
  let location = useLocation();
  let navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const [userContent, setUserContent] = useState(<div>NO content</div>);

  const logOutHandler = async () => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    try {
      await logoutUser({
        token,
      });

      //Delete the user from the localStorage
      localStorage.removeItem("user");
      //setAlert(NotificationMessage("success", "Logged in succesfully!"));

      //Redirect to home
      navigate(nav_routes.HOME);
    } catch (e) {
      if (e.hasOwnProperty("data.message")) {
        //setAlert(NotificationMessage("error", e.data.message));
      } else {
        //setAlert(NotificationMessage("error", "Error. Login attempt failed!"));
      }
    }
  };

  const userMenu = () => {
    console.log("User Menu Open");
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      //User Loged In
      const user = JSON.parse(localStorage.getItem("user")).user;
      setUserContent(
        <>
          <button onClick={userMenu} className="user-info">
            <ProfilePicture
              img="https://le-cdn.hibuwebsites.com/a1921b266e5f44738a779d63a0fb5fa0/dms3rep/multi/opt/cherished-memories-photography--bio-640w.png"
              img_title="user_profile_pic"
            />

            <h6 className="user-info">{user.user_name}</h6>
          </button>

          <button
            className="btn btn-small btn-cancel my-2 my-sm-0"
            onClick={logOutHandler}
          >
            Logout
          </button>
        </>
      );
    } else {
      setUserContent(
        <NavLink
          className="btn btn-small btn-login my-2 my-sm-0"
          to={nav_routes.LOGIN}
        >
          Login
        </NavLink>
      );
    }
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* <NavLink className="navbar-brand" to={nav_routes.HOME}>
        Navbar
      </NavLink> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="row collapse navbar-collapse" id="navbarColor01">
        <div className="col-2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to={nav_routes.HOME}>
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-8">
          <form className="">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button className="btn btn-search my-2 my-sm-0" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <div className="col-2">{userContent}</div>
      </div>
    </nav>
  );
}

export default Menu;
