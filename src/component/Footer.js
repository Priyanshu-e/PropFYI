import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/header/logo.png";
import phone from "../images/footer/phone.png";
import homesmart from "../images/footer/homesmart.png";
import email from "../images/footer/email.png";
import location from "../images/footer/location.png";
import SocialIcons from "../helper/SocialIcons";
import { FaFileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <img src={logo} className="footer_logo" />
              <img src={homesmart} className="homesmart" />
              <p className="footer_para">
                {websiteSettingData?.footer_description
                  ? websiteSettingData?.footer_description
                  : " Lorem Ipsum is simply dummy text of the printing...."}
              </p>
              <SocialIcons />
            </div>
            <div className="col-lg-2">
              <h3 className="footer_heading margin_heading">Home</h3>
              <ul className="footer_ul">
                {websiteSettingData?.footer_home_links?.map((item, index) => {
                  return (
                    <li className="footer_li" key={index}>
                      <NavLink
                        to={`/${item.home_link}`}
                        className="footer_anchor"
                        onClick={handleClick}
                      >
                        {item.home_text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-2">
              <h3 className="footer_heading">Quick Links</h3>
              <ul className="footer_ul">
                {websiteSettingData?.footer_quick_links?.map((item, index) => {
                  return (
                    <li className="footer_li" key={index}>
                      <NavLink
                        to={`/${item.quick_link}`}
                        className="footer_anchor"
                        onClick={handleClick}
                      >
                        {item.quick_text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-4">
              <h3 className="footer_heading">Get in Touch</h3>
              <div>
                <ul className="footer_ul">
                  <li className="footer_li">
                    <img src={phone} className="contact_icon" />
                    <a
                      href={`tel:${websiteSettingData?.phone}`}
                      className="footer_anchor"
                    >
                      {websiteSettingData?.phone
                        ? websiteSettingData?.phone
                        : "+123-123-1234"}
                    </a>
                  </li>
                  <li className="footer_li">
                    <img src={email} className="contact_icon" />
                    <a
                      href={`mailto:${websiteSettingData?.email}`}
                      className="footer_anchor"
                    >
                      {websiteSettingData?.email
                        ? websiteSettingData?.email
                        : "company@gmail.com"}
                    </a>
                  </li>
                  <li className="footer_li">
                    <img src={location} className="contact_icon" />{" "}
                    {websiteSettingData?.address
                      ? websiteSettingData?.address
                      : "374 Tower, William ST-1 2721, USA"}
                  </li>
                </ul>
                <p className="footer_line mt-5">
                  <FaFileAlt />
                  <a
                    href={
                      websiteSettingData?.first_link_url
                        ? websiteSettingData?.first_link_url
                        : "#"
                    }
                    target="_blank"
                  >
                    {websiteSettingData?.first_link_text
                      ? websiteSettingData?.first_link_text
                      : "Texas Real Estate Commission Information About Brokerage Services"}
                  </a>
                </p>
                <p className="footer_line">
                  <FaFileAlt />
                  <a
                    href={
                      websiteSettingData?.second_link_url
                        ? websiteSettingData?.second_link_url
                        : "#"
                    }
                    target="_blank"
                  >
                    {websiteSettingData?.second_link_text
                      ? websiteSettingData?.second_link_text
                      : "Texas Real Estate Commission Consumer Protection Notice"}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container-fluid">
        <div className="row footer_second_row">
          <div className="col-lg-12">
            <p className="disclaimer_para text-center">
              {websiteSettingData?.copyright_text
                ? websiteSettingData?.copyright_text
                : "2023 © All rights reserved by Company"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
