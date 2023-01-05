import React from "react";

import './ProfilePicture.css'

function ProfilePicture(props) {

    let img_size = 50;
    
    if(props.size !== undefined){
        img_size = props.size;
    }
    
    let border_size = Math.round(img_size * 0.6);

  return (
    <div className="avatar-frame" style={{width: img_size + "px", height: img_size + "px", borderRadius: border_size}}>
      <img src={props.img} alt={props.img_title} style={{width: img_size + "px", height: img_size + "px", borderRadius: border_size}}></img>
    </div>
  );
}

export default ProfilePicture;
