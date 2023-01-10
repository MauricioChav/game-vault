import React, { useState, useEffect } from "react";

import "./NotificationCard.css";

function NotificationCard(props) {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState("");

  useEffect(() => {
    if (props.notification.type !== undefined) {
      setType(props.notification.type);
      setMessage(props.notification.message);
      setVisible("visible");
    }
  }, [props.notification]);

  return (
    <div className={"notification-card n-" + type + " " + visible}>
      <h6>{message}</h6>
    </div>
  );
}

export default NotificationCard;

export function NotificationMessage(type, message) {
  return { type, message };
}
