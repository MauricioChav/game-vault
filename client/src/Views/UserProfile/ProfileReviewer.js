import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";
import Card from "../../Components/Card/Card";
import ProfilePicture from "../../Components/ProfilePicture/ProfilePicture";

import ReviewUserManager from "../../Components/ReviewComponents/ReviewUserManager";

import { useGetUserQuery } from "../../Api/userEndpoints";

function ProfileReviewer(props) {
  //Get user Profile
  const route = useParams();
  const {
    data: userData,
    isError,
    isLoading,
    error,
  } = useGetUserQuery(route.name);

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  let loggedId = "";

  if (loggedUser !== null) {
    loggedId = loggedUser.user._id;
  }

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
    return (
      <Card className="text-center">
        <h1>Getting User data...</h1>
      </Card>
    );
  } else if (userData.user_type !== 0) {
    return errorContent;
  }

  return (
    <>
      <Card>
        <div className="row">
          <div className="col-9">
            <ProfilePicture
              img={
                userData.img_profile !== ""
                  ? userData.img_profile
                  : "https://le-cdn.hibuwebsites.com/a1921b266e5f44738a779d63a0fb5fa0/dms3rep/multi/opt/cherished-memories-photography--bio-640w.png"
              }
              img_title={userData.user_name + "_profile_pic"}
              size={100}
            />
            <h1>{userData.user_name}</h1>
            <h5>{userData.follower_count} followers</h5>
          </div>
          <div className="col-3">
          {loggedId !== userData._id && (
              <button className="btn btn-small btn-classic">Follow +</button>
            )}
            {loggedId === userData._id && (
              <NavLink
                to={nav_routes.PROFILE_EDIT}
                className="btn btn-small btn-info"
              >
                <i className="fa-solid fa-gear"></i> &nbsp; Account Settings
              </NavLink>
            )}
          </div>
        </div>
        <div className="row">
          <p className="profile-about">{userData.about_me}</p>
        </div>

        <div>
          <h2>Recent Reviews</h2>
          <ReviewUserManager user_name={userData.user_name} allReviewsButton={true}/>
        </div>
        
      </Card>
    </>
  );
}

export default ProfileReviewer;
