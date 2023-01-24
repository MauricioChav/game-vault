import React from "react";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import ProfilePicture from "../../Components/ProfilePicture/ProfilePicture";

import { useGetUserQuery } from "../../Api/apiSlice";

function ProfileReviewer(props) {
  //Get user Profile
  const route = useParams();
  const { data, isError, isLoading, error } = useGetUserQuery(route.name);

  const errorContent = (
    <Card className="text-center">
      <h1 className="t-center" style={{ marginTop: "20px" }}>
        User not found!
      </h1>
    </Card>
  );

  if (isError) {
    console.log("Error", error);
    return errorContent;
  } else if (isLoading) {
    return <h1>Getting User data...</h1>;
  } else if (data.user_type !== 0) {
    console.log("Error", error);
    return errorContent;
  }

  return (
    <>
      <Card>
        <div className="row">
          <div className="col-9">
            <ProfilePicture
              img="https://le-cdn.hibuwebsites.com/a1921b266e5f44738a779d63a0fb5fa0/dms3rep/multi/opt/cherished-memories-photography--bio-640w.png"
              img_title={data.user_name + "_profile_pic"}
              size={100}
            />
            <h1>{data.user_name}</h1>
            <h5>{data.follower_count} followers</h5>
          </div>
          <div className="col-3">
            <button className="btn btn-small">Follow +</button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProfileReviewer;
