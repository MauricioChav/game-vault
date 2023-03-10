import React from "react";
import { useParams } from "react-router-dom";

import Card from "../../Components/Card/Card";
import ReviewManager from "../../Components/ReviewComponents/ReviewGameManager";

import { useGetGameQuery } from "../../Api/gameEndpoints";

function Reviews() {
  const route = useParams();
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
      <ReviewManager game_id={game._id} short_title={game.short_title} allReviewsButton={false}/>
    </Card>
  );
}

export default Reviews;
