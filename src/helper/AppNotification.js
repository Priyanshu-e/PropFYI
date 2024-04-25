import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const AppNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const notificationVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      {isVisible && (
        <section>
          <ImCross
            className="notification_cross"
            onClick={notificationVisibility}
          />

          <div className="notification_div">
            <p className="notification_para">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <a href="" className="notification_btn">
              Get App
            </a>
          </div>
        </section>
      )}
    </>
  );
};

export default AppNotification;
