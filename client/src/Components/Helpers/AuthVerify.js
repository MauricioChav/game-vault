import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";

const parseJwt = (token) => {
  try {
    const buff = new Buffer.from(token.split(".")[1], "base64");
    return JSON.parse(buff.toString("utf-8"));
  } catch (e) {
    return null;
  }
};

function AuthVerify(props) {

  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        const decodedJwt = parseJwt(user.token);

        console.log(decodedJwt);

        if(decodedJwt.exp * 1000 < Date.now()){
            props.logOut();
        }
    }
  }, [location, props]);

  return <div></div>;
}

export default AuthVerify;
