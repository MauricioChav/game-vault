import React from "react";
import Card from "../Common/Card/Card";
import ImageSlide from "../Common/ImageSlide/ImageSlide";

import GameTableTest from "../DB/GameTableTest";

function Home() {
  return (
    <Card className="text-center">
      <h1>Game Vault</h1>
      <h4>Your video game review site</h4>
      <ImageSlide title="Most Popular Games" type="game" array={GameTableTest} />
    </Card>
  );
}

export default Home;
