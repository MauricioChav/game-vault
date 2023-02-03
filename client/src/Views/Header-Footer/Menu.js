import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";

import ProfilePicture from "../../Components/ProfilePicture/ProfilePicture";

import { useLogoutUserMutation } from "../../Api/userEndpoints";

import "../../App.css";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  //Dropdown user Menu
  const ref = useRef(null);
  const [userContent, setUserContent] = useState(<div>NO content</div>);

  const [logoutUser] = useLogoutUserMutation();

  //Open close the menu
  const openCloseMenu = () => {
    const element = ref.current;

    if (element.style.display === "" || element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

  //Close the menu by clicking an era other than the dropdown
  const closeMenu = (e) => {
    const element = ref.current;
    const parent = ref.current.parentElement;

    if (element && !parent.contains(e.target)) {
      element.style.display = "none";
    }
  };

  //User log in validation
  useEffect(() => {
    async function checkLogin() {
      const logOutHandler = async () => {
        const token = JSON.parse(localStorage.getItem("user")).token;
        try {
          await logoutUser({
            token,
          });

          //Delete the user from the localStorage
          localStorage.removeItem("user");

          //Redirect to home
          navigate(nav_routes.HOME);
        } catch (e) {
          console.log("Error", e);
        }
      };

      if (localStorage.getItem("user") !== null) {
        document.addEventListener("mousedown", closeMenu);
        //User Loged In
        const user = JSON.parse(localStorage.getItem("user")).user;
        setUserContent(
          <div>
            <button onClick={openCloseMenu} className="user-info">
              <ProfilePicture
                img={
                  user.img_profile !== ""
                    ? user.img_profile
                    : "https://le-cdn.hibuwebsites.com/a1921b266e5f44738a779d63a0fb5fa0/dms3rep/multi/opt/cherished-memories-photography--bio-640w.png"
                }
                img_title="user_profile_pic"
              />

              <h6>{user.user_name}</h6>
            </button>

            <div className="user-dropdown bg-dark" ref={ref}>
              <NavLink
                className="user-info"
                to={
                  (user.user_type === 0
                    ? nav_routes.PROFILE_REVIEWER
                    : nav_routes.PROFILE_DEV) + user.user_name
                }
                onClick={openCloseMenu}
              >
                <table>
                  <tbody>
                    <tr>
                      <td className="user-info-icon">
                        <i className="fa-solid fa-user"></i>
                      </td>
                      <td className="user-info-text">Profile</td>
                    </tr>
                  </tbody>
                </table>
              </NavLink>

              {user.user_type === 1 && (
                <>
                  <NavLink
                    className="user-info"
                    to={nav_routes.GAME_EDIT + "new"}
                    onClick={openCloseMenu}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td className="user-info-icon">
                            <i className="fa-solid fa-plus"></i>
                          </td>
                          <td className="user-info-text">Add new Game</td>
                        </tr>
                      </tbody>
                    </table>
                  </NavLink>
                  <NavLink
                    className="user-info"
                    to={nav_routes.PROFILE_DEV + user.user_name + "/games"}
                    onClick={openCloseMenu}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td className="user-info-icon">
                            <i className="fa-solid fa-gamepad"></i>
                          </td>
                          <td className="user-info-text">My Games</td>
                        </tr>
                      </tbody>
                    </table>
                  </NavLink>
                </>
              )}

              {user.user_type === 0 && (
                <NavLink
                  className="user-info"
                  to={nav_routes.PROFILE_REVIEWER + user.user_name}
                  onClick={openCloseMenu}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td className="user-info-icon">
                          <i className="fa-solid fa-file-pen"></i>
                        </td>
                        <td className="user-info-text">My Reviews</td>
                      </tr>
                    </tbody>
                  </table>
                </NavLink>
              )}

              <NavLink
                className="user-info"
                to={nav_routes.PROFILE_EDIT}
                onClick={openCloseMenu}
              >
                <table>
                  <tbody>
                    <tr>
                      <td className="user-info-icon">
                        <i className="fa-solid fa-gear"></i>
                      </td>
                      <td className="user-info-text">Account Settings</td>
                    </tr>
                  </tbody>
                </table>
              </NavLink>

              <button className="user-info btn-cancel" onClick={logOutHandler}>
                <table>
                  <tbody>
                    <tr>
                      <td className="user-info-icon">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      </td>
                      <td className="user-info-text">Logout</td>
                    </tr>
                  </tbody>
                </table>
              </button>
            </div>
          </div>
        );
      } else {
        setUserContent(
          <NavLink
            className="btn btn-small btn-primary my-2 my-sm-0"
            to={nav_routes.LOGIN}
          >
            Login &nbsp; <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </NavLink>
        );
      }
    }

    checkLogin();
  }, [location, logoutUser, navigate]);

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
        <div className="col-1">
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

        <div className="col-3">{userContent}</div>
      </div>
    </nav>
  );
}

export default Menu;
