import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";
import Card from "../../Components/Card/Card";
import ProfilePicture from "../../Components/ProfilePicture/ProfilePicture";
import ImageSlide from "../../Components/ImageSlide/ImageSlide";
import { useGetUserQuery } from "../../Api/userEndpoints";

function ProfileDev(props) {
  const route = useParams();
  const { data, isError, isLoading, error } = useGetUserQuery(route.name);

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  let loggedId = "";

  if(loggedUser !== undefined){
    loggedId = loggedUser.user._id;
    console.log(loggedId);
  }
  

  const errorContent = (
    <Card className="text-center">
      <h1 className="t-center" style={{ marginTop: "20px" }}>
        Company not found!
      </h1>
    </Card>
  );

  if (isError) {
    console.log("Error", error);
    return errorContent;
  } else if (isLoading) {
    return <h1>Getting User data...</h1>;
  } else if (data.user_type !== 1) {
    return errorContent;
  }

  console.log(data.games);

  return (
    <>
      <div
        className="profile-banner"
        style={{
          backgroundImage:
            `url("` +
            (data.hasOwnProperty("img_banner")
              ? data.img_banner
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKpVdlx3oCcTPIYgI3z67cp-MGupBmA1c7Q&usqp=CAU") +
            `")`,
        }}
      ></div>

      <Card>
        <div className="row">
          <div className="col-9">
            <ProfilePicture
              img={
                data.hasOwnProperty("img_profile")
                  ? data.img_profile
                  : "https://le-cdn.hibuwebsites.com/a1921b266e5f44738a779d63a0fb5fa0/dms3rep/multi/opt/cherished-memories-photography--bio-640w.png"
              }
              img_title={data.user_name + "_profile_pic"}
              size={100}
            />
            <h1>{data.user_name}</h1>
            <h5>{data.follower_count} followers</h5>
          </div>
          <div className="col-3">
            {loggedId !== data._id && <button className="btn btn-small btn-classic">Follow +</button>}
            {loggedId === data._id && <NavLink to={nav_routes.PROFILE_EDIT + loggedUser.user.user_name} className="btn btn-small btn-info"><i className="fa-solid fa-gear"></i> &nbsp; Account Settings</NavLink>}
          </div>
        </div>
        <br></br>
        <div className="row">
          {Object.keys(data.games).length  > 0 ? <ImageSlide title="Latest Releases" type="game" array={data.games} /> : <h1>This developer has no games registered</h1>}
          
        </div>
      </Card>
    </>
  );
}

export default ProfileDev;
