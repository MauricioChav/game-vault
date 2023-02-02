import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";

import Card from "../../Components/Card/Card";
import ImageSlide from "../../Components/ImageSlide/ImageSlide";

import { useGetDevGamesQuery } from "../../Api/gameEndpoints";

const GameList = () => {
  const route = useParams();
  const { data, isError, isLoading, error } = useGetDevGamesQuery(route.name);

  const errorContent = (
    <Card className="text-center">
      <h1 className="t-center" style={{ marginTop: "20px" }}>
        No Games found!
      </h1>
    </Card>
  );

  if (isError) {
    console.log("Error", error);
    return errorContent;
  } else if (isLoading) {
    return (
      <Card>
        <h1>Getting Developer games...</h1>
      </Card>
    );
  }

  //Dev validation for "My Games"
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  let dev_name = data.user.legal_name;
  if (loggedUser !== null)
    if (loggedUser.user._id === data.user._id)
      dev_name = "My";

  return (
    <Card>
      {data.games.length <= 0 && (
        <>
          <h1>{dev_name} games</h1>
          <h1>No Games Found</h1>
        </>
      )}
      {data.games.length > 0 && (
        <ImageSlide
          title={dev_name + " games"}
          type="game"
          array={data.games}
        />
      )}
      <NavLink to={nav_routes.PROFILE_DEV + route.name} className="btn btn-classic"> Back to {data.user.legal_name.endsWith("s") ? data.user.legal_name + "'" : data.user.legal_name + "'s"} Profile</NavLink>
    </Card>
  );
};

export default GameList;
