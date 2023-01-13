import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import { useGetOwnUserMutation } from "../../Api/apiSlice";

import "../../App.css";

function Menu() {
  const [userInfo, setUserInfo] = useState({});

  const [getOwnUser] = useGetOwnUserMutation();

  // const {data, isError, isLoading, error} = useGetOwnUserQuery({
  //   token
  // });

  // console.log("DATA IS ", data);

  const fetchData = async () => {
    //Check if a token exists in the cookies
    let str = document.cookie;

    if (str.includes("apitoken=")) {
      //Select only the token string
      str = str.slice(str.indexOf("apitoken="));
      str = str.split(" ")[0];
      let token = str.replace("apitoken=", "");

      //Call for the information
      try {
        let ownUser = await getOwnUser({
          token,
        }).unwrap();

        //Set the state info
        setUserInfo(ownUser);
        console.log("USER INFO FETCHED!");
      } catch (e) {
        console.log("USER INFO FAILED!");
      }
    } else {
      setUserInfo({});
    }
  };

  useEffect(() => {
    console.log("COOKIES CHANGED!", document.cookie);
    fetchData();
    
  }, [document.cookie]);

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

        <div className="col-2">
          <NavLink
            className="btn btn-small btn-login my-2 my-sm-0"
            to={nav_routes.LOGIN}
          >
            Login
          </NavLink>
          <p style={{ color: "white" }}>Username: {userInfo.user_name}</p>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
