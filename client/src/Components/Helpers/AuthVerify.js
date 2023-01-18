import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";

import { useGetOwnUserMutation } from "../../Api/apiSlice";

const parseJwt = (token) => {
  try {
    const buff = new Buffer.from(token.split(".")[1], "base64");
    return JSON.parse(buff.toString("utf-8"));
  } catch (e) {
    return null;
  }
};

function AuthVerify(props) {
  //Verify auth
  const [authUser] = useGetOwnUserMutation();

  let location = useLocation();

  useEffect(() => {
    async function validateToken() {
      //Verify auth
      try {
        const auth = await authUser({
          token: user.token,
        }).unwrap();

        console.log("AUTH SUCCESSFUL ", auth);
      } catch (e) {
        console.log("AUTH FAILED ", e);
        props.logOut();
      }
    }
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.token);

      //Validate if the token is still valid
      validateToken();

      //Validate if the token has expired
      //The date validation is 3 seconds earlier to eliminate the token from the DB
      if (decodedJwt.exp * 1000 - 3000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return <div></div>;
}

export default AuthVerify;
