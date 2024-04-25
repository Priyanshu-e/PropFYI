import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../component/component.css";
import logo from "../images/header/logo.png";
import loginImage from "../images/header/login.png";
import userImage from "../images/header/user.png";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import MobileHeaeder from "./MobileHeader";
import { BASE_URL } from "../route/BaseUrl";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyType = searchParams.get("property_type");

  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const openSignupModal = () => {
    setShowSignupModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const [userData, setUserData] = useState();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");

    if (userDetails) {
      setUserData(JSON.parse(userDetails).data);
    } else {
      setUserData(userDetails);
    }
  }, []);

  const getUserData = async () => {
    try {
      const userDetailsString = localStorage.getItem("userDetails");
      const userDetails = JSON.parse(userDetailsString).token;
      const requestGetOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Access-Control-Allow-Credentials": true,
        },
      };

      const res = await fetch(
        `${BASE_URL}/api/users/profile`,
        requestGetOptions
      );

      const userdata = await res.json();
      setImage(userdata.data.image);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [showDeleteDiv, setShowDeleteDiv] = useState(false);
  const logOutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const deleteUser = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;
    const deleteOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userDetails}`,
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/delete-an-account`,
        deleteOptions,
        userDetails
      );
      const result = await response.json();
      localStorage.clear();
      window.location.href = "/";
      console.log(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  const [showDelete, setShowDelete] = useState(false);
  const deleteRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (deleteRef.current && !deleteRef.current.contains(event.target)) {
        setShowDeleteDiv(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteRef]);
  return (
    <>
      <section className="header_section desktop_header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 left_col">
              <ul className="left_ul">
                <li className="left_li">
                  <NavLink
                    to={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=sale`}
                    className={propertyType === "sale" ? "top_active" : ""}
                  >
                    Buy
                  </NavLink>
                  {/* <a
                    href={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=sale&baths=&beds=&min_price=&max_price=&home_type=&keyword=&min_size=&max_size=&min_lotsize=&max_lotsize=&min_yearBuilt=&max_yearBuilt=&listing_days=`}
                    className={propertyType === "sale" ? "top_active" : ""}
                  >
                    Buy
                  </a> */}
                </li>
                <li className="left_li">
                  <NavLink
                    to={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=rental`}
                    className={propertyType === "rental" ? "top_active" : ""}
                  >
                    Rent
                  </NavLink>
                  {/* <a
                    href={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=rental&baths=&beds=&min_price=&max_price=&home_type=&keyword=&min_size=&max_size=&min_lotsize=&max_lotsize=&min_yearBuilt=&max_yearBuilt=&listing_days=`}
                    className={propertyType === "rental" ? "top_active" : ""}
                  >
                    Rent
                  </a> */}
                </li>
                <li className="left_li header_active">
                  <NavLink
                    to={`/${websiteSettingData?.footer_home_links[0]?.home_link}`}
                  >
                    Sell
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 middle_col">
              <NavLink to="/">
                <img src={logo} className="header_logo" />
              </NavLink>
            </div>
            <div className="col-lg-3 left_col">
              <ul className="left_ul">
                <li className="left_li header_active">
                  <NavLink to="/mortgage">Mortgage</NavLink>
                </li>
                <li className="left_li header_active">
                  <NavLink to="/blog">Blog</NavLink>
                </li>
                <li className="left_li header_active">
                  <NavLink to="/help">Help</NavLink>
                </li>
              </ul>
            </div>

            {userData === null ? (
              <div
                className="col-lg-1 login_btn"
                onClick={() => setShowModal(true)}
              >
                <img src={loginImage} className="header_login" />
              </div>
            ) : (
              <>
                <div
                  className="col-lg-1 user_btn"
                  onClick={() => {
                    setShowDeleteDiv(true);
                  }}
                >
                  <NavLink>
                    {image == null ? (
                      <img
                        src={userImage}
                        className="header_login header_avatar"
                      />
                    ) : (
                      <img src={image} className="header_login header_avatar" />
                    )}
                  </NavLink>
                </div>
                {showDeleteDiv && (
                  <div ref={deleteRef} className="delete_div">
                    <ul>
                      <li>
                        <NavLink to="/profile" className="user_hover">
                          Profile
                        </NavLink>
                      </li>
                      <li
                        onClick={() => {
                          setShowDelete(true);
                        }}
                      >
                        Delete Account
                      </li>
                      <li
                        onClick={() => {
                          logOutUser();
                        }}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
                {showDelete && (
                  <div className="sure_delete_div">
                    <div>
                      <p>Are you sure ?</p>
                    </div>
                    <div className="delete_btn_div">
                      <button
                        className="button_delete_modal"
                        onClick={() => {
                          deleteUser();
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="button_delete_modal_two"
                        onClick={() => {
                          setShowDelete(false);
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      {showModal && (
        <Login closeModal={closeModal} openSignupModal={openSignupModal} />
      )}
      {showSignupModal && (
        <Signup closeModal={() => setShowSignupModal(false)} />
      )}
      <MobileHeaeder />
    </>
  );
};

export default Header;
