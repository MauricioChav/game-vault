import React from "react";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import ProfilePicture from "../../Components/ProfilePicture/ProfilePicture";
import ImageSlide from "../../Components/ImageSlide/ImageSlide";

import DevTableTest from "../../DB/DevTableTest";
import GameTableTest from "../../DB/GameTableTest";

function ProfileDev(props) {
  const route = useParams();
  let dev_info = DevTableTest.find((o) => o.short_name === route.name);
  let dev_games = GameTableTest.filter((o)=> o.developer_short === route.name);

  return (
    <>
      <div
        className="profile-banner"
        style={{ backgroundImage: `url("` + dev_info.cover_image + `")` }}
      ></div>

      <Card>
        <div className="row">
          <div className="col-9">
            <ProfilePicture
              img={dev_info.logo}
              alt={dev_info.short_name}
              size={100}
            />
            <h1>{dev_info.name}</h1>
            <h5>{dev_info.follower_count} followers</h5>
          </div>
          <div className="col-3">
            <button className="btn btn-small">Follow +</button>
          </div>
        </div>
        <div className="row">
        <ImageSlide title="Latest Releases" type="game" array={dev_games} />
        </div>
      </Card>
    </>
  );
}

export default ProfileDev;
