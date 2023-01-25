import React from "react";
import Card from "../../Components/Card/Card";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

function ProfileEdit() {
  return (
    <Card>
      <div className="row">
        <div className="col-10">
          <h1>
            <i className="fa-solid fa-gear"></i> &nbsp; Account Settings
          </h1>
        </div>
        <div className="col-2">
          <NavLink
            to={nav_routes.HOME}
            className="btn btn-small btn-option"
          >
            Edit Profile
          </NavLink>
        </div>
      </div>
    </Card>
  );
}

export default ProfileEdit;
