import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";

import Card from "../../Components/Card/Card";
import ReviewWall from "../../Components/ReviewComponents/ReviewsWall";
import NewReview from "../../Components/ReviewComponents/NewReview";

import { useGetGameQuery } from "../../Api/gameEndpoints";

function Reviews() {
  const route = useParams();
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //Validate user type if the user is loggedIn
  let userType = -1;
  if (loggedUser !== null) {
    userType = loggedUser.user.user_type;
  }

  const { data: game, isError, isLoading, error } = useGetGameQuery(route.name);

  const errorContent = (
    <Card className="text-center">
      <h1 className="t-center" style={{ marginTop: "20px" }}>
        Game not found!
      </h1>
    </Card>
  );

  if (isError) {
    console.log("Error", error);
    return errorContent;
  } else if (isLoading) {
    return (
      <Card>
        <h1>Getting Game reviews...</h1>
      </Card>
    );
  }

  return (
    <Card>
      {loggedUser !== null && userType === 0 && <NewReview />}
      {loggedUser === null && (
        <NavLink
          to={nav_routes.LOGIN}
          className="btn btn-primary btn-big fg-space"
        >
          Login to create a review
        </NavLink>
      )}
      <ReviewWall game_id={game._id} short_title={game.short_title} />
    </Card>
  );
}

export default Reviews;
