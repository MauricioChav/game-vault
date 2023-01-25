import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";
// import { Buffer } from "buffer";

import {
  useValidateUserMutation,
  useDeleteDBTokenMutation,
} from "../../Api/userEndpoints";

//Parse the user/duration token info
// const parseJwt = (token) => {
//   try {
//     const buff = new Buffer.from(token.split(".")[1], "base64");
//     return JSON.parse(buff.toString("utf-8"));
//   } catch (e) {
//     return null;
//   }
// };

function AuthVerify() {
  let navigate = useNavigate();
  const [authUser] = useValidateUserMutation();
  const [logoutUser] = useDeleteDBTokenMutation();

  let location = useLocation();

  useEffect(() => {
    //Validate token with auth
    async function validateToken(user) {
      try {
        await authUser({
          token: user.token,
        }).unwrap();

        //return console.log("AUTH SUCCESSFUL ", auth);
      } catch (e) {
        console.log("AUTH FAILED ", e);

        //Verify the token in the DB
        try {
          const dbToken = await logoutUser({
            _id: user.user._id,
            token: user.token,
          }).unwrap();

          console.log(dbToken);
        } catch (e) {
          console.log(e);
          console.log("FAILED TO DELETE TOKEN");
        }

        //Remove from the localStorage
        localStorage.removeItem("user");
        console.log("LOGOUT SUCCESFUL!");

        //Redirect to home
        navigate(nav_routes.HOME);
      }
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      validateToken(user);
    }
  }, [location, authUser, logoutUser, navigate]);

  return <div></div>;
}

export default AuthVerify;
