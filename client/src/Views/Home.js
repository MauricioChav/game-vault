import React from "react";
import Card from "../Components/Card/Card";
import ImageSlide from "../Components/ImageSlide/ImageSlide";

import { useGetAllGamesQuery } from "../Api/gameEndpoints";

function Home() {
  const { data, isError, isLoading, error } = useGetAllGamesQuery();

  return (
    <Card className="text-center">
      <h1>Game Vault</h1>
      <h4>Your video game review site</h4>
      {isError && console.log("Error", error)}
      {isError && (<><h1>Server Error. No Games Found</h1></>)}
      {isLoading && (<><h1>Loading games library...</h1></>)}
      {data !== undefined && data.length <= 0 && (<><h1>No Games Found</h1></>)}
      {data !== undefined && data.length > 0 && (<ImageSlide title="Most Popular Games" type="game" array={data} />)}
      
    </Card>
  );
}

export default Home;
