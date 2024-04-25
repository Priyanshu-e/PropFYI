import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../home/home.css";
import SocialIcons from "../../helper/SocialIcons";
import bannerBg from "../../images/home/banner.png";
import aboutImage from "../../images/home/about-profify.png";
import SearchProperty from "../../helper/SearchProperty";
import HotDeal from "./HotDeal";
import FeatureProperties from "./FeatureProperties";
import TrendingProperties from "./TrendingProperties";
import Services from "./Services";
import Statics from "./Statics";
import Newsletter from "../../helper/Newsletter";
import smart from "../../images/home/smart.png";
import beautyful from "../../images/home/beautyful.png";
import exceptional from "../../images/home/exceptional.png";
import complete from "../../images/home/complete.png";
import appBackground from "../../images/home/app-background.png";
import apple from "../../images/home/apple.png";
import google from "../../images/home/google.png";
import barcode from "../../images/home/barcode.png";
import appAbout from "../../images/home/app-about.png";
import { BASE_URL } from "../../route/BaseUrl";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../redux/slices/homePageDataSlice";
const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(${appBackground})`,
    backgroundSize: "cover",
  };
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state?.homePage?.data?.data);
  const isLoading = useSelector((state) => state.homePage.isLoading);

  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);
  return (
    <>
      {isLoading && (
        <section className="pre_loader">
          <div>
            <WebsiteLoader />
          </div>
        </section>
      )}
      <section
        className="banner_bg mobile_padding"
        style={{
          backgroundImage: `url(${
            homePageData?.banner_image ? homePageData?.banner_image : bannerBg
          })`,
        }}
      >
        <div className="container-fluid">
          <div className="row mobile_hide">
            <div className="col-lg-12 social_div ">
              <SocialIcons />
            </div>
          </div>
          <div className="row banner_second_row">
            <div className="col-lg-12 text-center banner_div">
              <h1 className="banner_heading">
                {homePageData?.banner_title
                  ? homePageData?.banner_title
                  : "Find Your Property"}
              </h1>
              <p className="banner_para mobile_hide">
                {homePageData?.banner_sub_title
                  ? homePageData?.banner_sub_title
                  : "Lorem Ipsum is simply dummy text"}
              </p>
            </div>

            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <SearchProperty placeHolderTitle="Enter an address, neighborhood, city, or ZIP code" />
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </section>
      <HotDeal />
      <FeatureProperties />
      <Services />
      <TrendingProperties />
      <Statics />

      <section className="about_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6  about_home_image">
              <img
                src={
                  homePageData?.about_image
                    ? homePageData?.about_image
                    : aboutImage
                }
                className="about_image"
              />
            </div>
            <div className="col-lg-6">
              <div className="about_div">
                <h3 className="about_subheading">
                  {homePageData?.about_sub_title
                    ? homePageData?.about_sub_title
                    : "About Us"}
                </h3>
                <h2 className="about_heading">
                  {homePageData?.about_title
                    ? homePageData?.about_title
                    : "Lorem Ipsum is simply dummy"}
                </h2>
                <p
                  className="about_para"
                  dangerouslySetInnerHTML={{
                    __html: homePageData?.about_descreption,
                  }}
                ></p>

                <div className="row">
                  {homePageData?.homepage_buttons?.map((item, index) => {
                    return (
                      <div className="col-lg-6 about_second_div" key={index}>
                        <img
                          src={item.button_image ? item.button_image : smart}
                        />
                        <p className="smart_heading">
                          {item.button_name
                            ? item.button_name
                            : "Smart Home Design"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="app_section" style={backgroundStyle}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 app_col">
              <div>
                <h1 className="app_heading">
                  {homePageData?.mobile_app_title
                    ? homePageData?.mobile_app_title
                    : "Download Propfyi Mobile App"}
                </h1>
                <p className="app_para">
                  {homePageData?.mobile_app_sub_title
                    ? homePageData?.mobile_app_sub_title
                    : " Lorem Ipsum is simply dummy text of the printing "}
                </p>
                <div className="bar_div">
                  <div>
                    <NavLink
                      to={`${
                        homePageData?.ios_app ? homePageData?.ios_app : "#"
                      }`}
                      target="_blank"
                    >
                      <img src={apple} className="apple_image" />
                    </NavLink>
                    <br />
                    <NavLink
                      to={`${
                        homePageData?.android_app
                          ? homePageData?.android_app
                          : "#"
                      }`}
                      target="_blank"
                    >
                      <img src={google} className="apple_image" />
                    </NavLink>
                  </div>
                  <div>
                    <img src={barcode} className="barcode_image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={appAbout} className="app_about_image" />
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default Home;
