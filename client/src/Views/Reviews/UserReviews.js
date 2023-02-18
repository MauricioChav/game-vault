import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import Card from "../../Components/Card/Card";
import ReviewUserManager from "../../Components/ReviewComponents/ReviewUserManager";

function UserReviews() {
  const route = useParams();
  return (
    <Card>
      <h1>
        {route.name.endsWith("s") ? route.name + "'" : route.name + "'s"}
        &nbsp; reviews
      </h1>
      <ReviewUserManager user_name={route.name} />

      <NavLink to={nav_routes.PROFILE_REVIEWER + route.name} className="btn btn-classic"> Back to {route.name.endsWith("s") ? route.name + "'" : route.name + "'s"} Profile</NavLink>
    </Card>
  );
}

export default UserReviews;
