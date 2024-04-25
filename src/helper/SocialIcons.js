import React from "react";
import "../helper/helper.css";
import envelope from "../images/footer/envelop.png";
import instagram from "../images/footer/instagram.png";
import facebook from "../images/footer/facebook.png";
import tiktok from "../images/footer/tiktok.png";
import { useSelector } from "react-redux";

const SocialIcons = () => {
  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );
  return (
    <>
      <div className="social_icons">
        <a href={`${websiteSettingData?.facebook}`} target="_blank">
          <img src={facebook} className="social_img" />
        </a>
        <a href={`${websiteSettingData?.tik_tok}`} target="_blank">
          <img src={tiktok} className="social_img" />
        </a>
        <a href={`${websiteSettingData?.twitter}`} target="_blank">
          <img src={envelope} className="social_img" />
        </a>
        <a href={`${websiteSettingData?.instagram}`} target="_blank">
          <img src={instagram} className="social_img" />
        </a>
      </div>
    </>
  );
};

export default SocialIcons;
