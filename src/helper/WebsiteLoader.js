import React from "react";
import { ColorRing } from "react-loader-spinner";
import "../helper/helper.css";
import loader from "../images/otherpages/loader.svg";
const WebsiteLoader = () => {
  return (
    <div className="loader-container">
      <img src={loader} />
    </div>
  );
};

export default WebsiteLoader;
