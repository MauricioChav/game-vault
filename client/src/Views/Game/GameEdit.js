import React from "react";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";

function GameEdit() {
  //Get Game Data
  const route = useParams();
  console.log(route);
  return (
    <Card className="text-center">
      <h1>Edit Game {route.name}</h1>
    </Card>
  );
}

export default GameEdit;
